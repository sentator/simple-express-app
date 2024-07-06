import { Response } from 'express';
import { Jwt } from 'jsonwebtoken';
import { AUTH_COOKIES_MAX_AGE } from './constants';
import { MessageDto, UserDto } from './types';
import { Message } from './entity';

export const isValidName = (name?: unknown): name is string => {
  return !!name && typeof name === 'string';
};

export const isValidAge = (age?: unknown): age is number => {
  return !!age && typeof age === 'number';
};

export const setRefreshTokenCookie = (refreshToken: string, res: Response) => {
  res.cookie('refreshToken', refreshToken, {
    maxAge: AUTH_COOKIES_MAX_AGE,
    httpOnly: true,
  });
};

export const getUserDtoFromTokenPayload = (
  payload: Jwt['payload'],
): UserDto | null => {
  if (
    typeof payload === 'object' &&
    'user_id' in payload &&
    'email' in payload
  ) {
    return { user_id: payload.user_id, email: payload.email };
  }

  return null;
};

export const getMessageDtoFromEntity = (messageEntity: Message): MessageDto => {
  const { sender, receiver, ...rest } = messageEntity;
  return { ...rest, sender_id: sender.user_id, receiver_id: receiver.user_id };
};
