from typing import Annotated

from fastapi import APIRouter, Depends, Query
from sqlalchemy import asc, desc, func, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_db
from app.models.event import Event
from app.schemas.event import EventCreate, EventRead, PaginatedEvents, SortField, SortOrder

router = APIRouter(prefix="/events", tags=["events"])

DbDep = Annotated[AsyncSession, Depends(get_db)]


@router.post("", response_model=EventRead, status_code=201)
async def create_event(body: EventCreate, db: DbDep) -> Event:
    event = Event(
        name=body.name,
        date=body.date,
        url=str(body.url),
        image=str(body.image),
        description=body.description,
    )
    db.add(event)
    await db.commit()
    await db.refresh(event)
    return event


@router.get("", response_model=PaginatedEvents)
async def list_events(
    db: DbDep,
    search: Annotated[str | None, Query(description="Filter by name or description")] = None,
    sort_by: Annotated[SortField, Query()] = SortField.date,
    order: Annotated[SortOrder, Query()] = SortOrder.asc,
    page: Annotated[int, Query(ge=1)] = 1,
    page_size: Annotated[int, Query(ge=1, le=100)] = 20,
) -> PaginatedEvents:
    base_query = select(Event)

    if search:
        pattern = f"%{search}%"
        base_query = base_query.where(
            Event.name.ilike(pattern) | Event.description.ilike(pattern)
        )

    sort_col = Event.date if sort_by == SortField.date else Event.name
    base_query = base_query.order_by(asc(sort_col) if order == SortOrder.asc else desc(sort_col))

    total_result = await db.execute(select(func.count()).select_from(base_query.subquery()))
    total = total_result.scalar_one()

    rows = await db.execute(base_query.offset((page - 1) * page_size).limit(page_size))
    events = list(rows.scalars().all())

    return PaginatedEvents(
        total=total,
        page=page,
        page_size=page_size,
        results=[EventRead.model_validate(e) for e in events],
    )
