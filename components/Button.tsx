import Link from 'next/link';
import { ReactNode } from 'react';
import styled, { css } from 'styled-components';

interface ButtonProps {
  href?: string;
  variant?: 'primary' | 'secondary' | 'text';
  onClick?: () => void;
  children: ReactNode;
}

const theme = {
  primary: {
    background: '#000',
    color: '#fff',
    border: 'none'
  },
  secondary: {
    background: 'white',
    color: 'black',
    border: '1px solid black'
  },
  text: {
    background: 'white',
    color: 'black',
    border: 'none'
  }
};

const sharedStyles = css<ButtonProps>`
  display: inline-block;
  padding: 12px 24px;
  border-radius: 100px;
  text-decoration: none;
  cursor: pointer;
  ${({ variant }) =>
    variant &&
    css`
      background: ${theme[variant].background};
      color: ${theme[variant].color};
      border: ${theme[variant].border};
    `}
`;

const StyledLink = styled(Link)<ButtonProps>`
  ${sharedStyles};
`;

const StyledButton = styled.button<ButtonProps>`
  ${sharedStyles};
`;

const Button = ({ href, variant = 'primary', children, onClick }: ButtonProps) => {
  if (href) {
    return (
      <StyledLink href={href} variant={variant} onClick={onClick}>
        {children}
      </StyledLink>
    );
  }
  return (
    <StyledButton variant={variant} onClick={onClick}>
      {children}
    </StyledButton>
  );
};

export default Button;
