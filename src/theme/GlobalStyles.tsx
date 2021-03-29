import React from 'react';
import { withStyles } from '@material-ui/core';

const DummyComponent: React.FC = () => null;

export const GlobalStyles = withStyles(
  {
    '@global': {
      '*': {
        margin: 0,
        padding: 0,
        boxSizing: 'border-box',
        minWidth: 0,
        minHeight: 0,
      },
      'html, body': {
        width: '100%',
        height: '100%',
        fontFamily: 'Inter, Verdana, Arial, Helvetica, sans-serif',
      },
      '#root': {
        display: 'flex',
        minHeight: '100vh',
      },
    },
  },
  {
    name: 'GlobalStyles',
  }
)(DummyComponent);
