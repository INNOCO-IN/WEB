import type { SelectHTMLAttributes } from 'react';
import { fieldStyle } from './Field';

export function Select(props: SelectHTMLAttributes<HTMLSelectElement>) {
  return <select {...props} style={{ ...fieldStyle, ...props.style }} />;
}
