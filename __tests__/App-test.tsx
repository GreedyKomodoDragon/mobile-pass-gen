import 'react-native';
import React from 'react';
import App from '../src/App';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import Section from '../src/components/Section';

it('renders correctly', () => {
  renderer.create(<Section title={''} />);
  renderer.create(<App />);
});
