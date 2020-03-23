import * as Yup from 'yup';
import { startOfHour, parseISO, isBefore } from 'date-fns';
import Appointment from '../models/Appointments';
import User from '../models/User';

class AppointmentController {
    async store(req, res) {
        const schema = Yup.object().shape({
            provider_id: Yup.number().required(),
            date: Yup.date().required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Erro de Validação' });
        }

        const { provider_id, date } = req.body;

        // Checar se o proveider_id é um provider
        const checkIsProvider = await User.findOne({
            where: { id: provider_id, provider: true },
        });

        if (!checkIsProvider) {
            return res.status(401).json({
                // eslint-disable-next-line prettier/prettier
                error: 'Você só pode agendar um horário com um prestador de serviços',
            });
        }

        const hourStart = startOfHour(parseISO(date));

        // Verificação de data passada

        if (isBefore(hourStart, new Date())) {
            return res
                .status(400)
                .json({ error: 'Datas já passadas não são permitidas' });
        }
        // Verificação da disponibilidade de data

        const checkAvailability = await Appointment.findOne({
            where: {
                provider_id,
                canceled_at: null,
                date: hourStart,
            },
        });

        if (checkAvailability) {
            return res.status(400).json({ error: 'Data não disponível' });
        }

        // Criar agendamento
        const appointment = await Appointment.create({
            user_id: req.userId,
            provider_id,
            date: hourStart,
        });

        return res.json(appointment);
    }
}

export default new AppointmentController();
