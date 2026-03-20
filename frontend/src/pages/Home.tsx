import { Button, Container, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'

type FormValues = {
  name: string
}

export default function Home() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>()

  const onSubmit = (data: FormValues) => {
    console.log(data)
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Typography variant="h4" gutterBottom>
        Monorepo Template
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register('name', { required: 'Name is required' })}
          placeholder="Your name"
          className="border rounded px-3 py-2 w-full mb-2"
        />
        {errors.name && (
          <p className="text-red-500 text-sm mb-2">{errors.name.message}</p>
        )}
        <Button type="submit" variant="contained">
          Submit
        </Button>
      </form>
    </Container>
  )
}
