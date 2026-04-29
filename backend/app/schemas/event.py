from datetime import datetime
from enum import StrEnum

from pydantic import BaseModel, HttpUrl


class EventCreate(BaseModel):
    name: str
    date: datetime
    url: HttpUrl
    image: HttpUrl
    description: str


class EventRead(BaseModel):
    model_config = {"from_attributes": True}

    id: int
    name: str
    date: datetime
    url: str
    image: str
    description: str


class SortField(StrEnum):
    date = "date"
    name = "name"


class SortOrder(StrEnum):
    asc = "asc"
    desc = "desc"


class PaginatedEvents(BaseModel):
    total: int
    page: int
    page_size: int
    results: list[EventRead]
