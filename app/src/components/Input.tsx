import type { InputHTMLAttributes, TextareaHTMLAttributes } from 'react';
import { fieldStyle } from './Field';

export function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} style={{ ...fieldStyle, ...props.style }} />;
}

export function Textarea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} style={{ ...fieldStyle, resize: 'vertical', ...props.style }} />;
}
