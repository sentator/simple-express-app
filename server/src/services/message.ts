import { AppDataSource } from '../database/data-source';
import { Message, User } from '../entity';
import ApiError from '../exceptions/apiError';
import { CreateMessageBody, MessageDto, UpdateMessageBody } from '../types';
import { getMessageDtoFromEntity } from '../utils';

class MessageService {
  async getAll() {
    const messageRepository = AppDataSource.getRepository(Message);
    return await messageRepository.find();
  }

  async create({
    value,
    sender,
    receiver,
  }: CreateMessageBody): Promise<MessageDto> {
    const messageRepository = AppDataSource.getRepository(Message);
    const userRepository = AppDataSource.getRepository(User);

    const senderUser = await userRepository.findOneBy({ user_id: sender });
    const receiverUser = await userRepository.findOneBy({ user_id: receiver });

    if (!senderUser || !receiverUser) {
      throw ApiError.BadRequest('Sender or receiver does not exist');
    }

    const message = messageRepository.create({
      value,
      sender: senderUser,
      receiver: receiverUser,
    });
    await messageRepository.save(message);

    return getMessageDtoFromEntity(message);
  }

  async update({
    message_id,
    value,
    sender,
    receiver,
  }: UpdateMessageBody): Promise<MessageDto> {
    const messageRepository = AppDataSource.getRepository(Message);
    const userRepository = AppDataSource.getRepository(User);
    const message = await messageRepository.findOneBy({ message_id });

    if (!message) {
      throw ApiError.BadRequest('Message with such message_id does not exist');
    }

    const senderUser = await userRepository.findOneBy({ user_id: sender });
    const receiverUser = await userRepository.findOneBy({ user_id: receiver });

    if (!senderUser || !receiverUser) {
      throw ApiError.BadRequest('Sender or receiver does not exist');
    }

    const updatedMessage = {
      ...message,
      value,
      sender: senderUser,
      receiver: receiverUser,
    };
    await messageRepository.save(updatedMessage);

    return getMessageDtoFromEntity(updatedMessage);
  }

  async delete(message_id: number) {
    const messageRepository = AppDataSource.getRepository(Message);
    const message = await messageRepository.findOne({
      where: { message_id },
      relations: { sender: true, receiver: true },
    });

    if (!message) {
      throw ApiError.BadRequest('Message with such message_id does not exist');
    }

    await messageRepository.delete({ message_id });
    return getMessageDtoFromEntity(message);
  }
}

export default new MessageService();
