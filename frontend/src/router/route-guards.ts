import {
    redirect,
} from '@tanstack/react-router';
import { authStorage } from '../features/auth.storage';


export function requireAuth() {
  if (!authStorage.isAuthenticated()) {
    throw redirect({
      to: '/auth',
    });
  }
}

export function requireGuest() {
  if (authStorage.isAuthenticated()) {
    throw redirect({
      to: '/dashboard',
    });
  }
}