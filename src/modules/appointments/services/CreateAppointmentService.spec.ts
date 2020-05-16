import AppError from '@shared/errors/AppError';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';

import CreateAppointmentService from './CreateAppointmentService';

describe('CreateAppointment', () => {
  it('Should be able to create a new appointment', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );
    const appointment = await createAppointment.execute({
      date: new Date(),
      provider_id: '1234123123',
    });
    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('1234123123');
  });

  it('should not be albe to create two appointments on the same date', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );

    const appointmentDate = new Date(2020, 4, 10, 11);

    await createAppointment.execute({
      date: appointmentDate,
      provider_id: '1234123123',
    });

    expect(
      createAppointment.execute({
        date: appointmentDate,
        provider_id: '1234123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});