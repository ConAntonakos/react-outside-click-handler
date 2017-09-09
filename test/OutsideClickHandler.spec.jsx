import React from 'react';
import { mount } from 'enzyme';
import OutsideClickHandler from '../lib/OutsideClickHandler';

describe('<OutsideClickHandler />', () => {
  it('should calls componentDidMount', () => {
    const spy = jest.spyOn(OutsideClickHandler.prototype, 'componentDidMount');
    mount(<OutsideClickHandler />);
    expect(spy.mock.calls.length).toBe(1);
  });

  it('should calls props.onOutsideClick when simulates outside click events', () => {
    const onOutsideClick = jest.fn();
    const wrapper = mount(
      <OutsideClickHandler onOutsideClick={onOutsideClick}>
        <button type="button" id="inside" />
      </OutsideClickHandler>,
    );
    const insideButton = wrapper.children().get(0);
    wrapper.instance().handleOutsideClick({ target: insideButton });
    expect(onOutsideClick.mock.calls.length).toBe(0);
    wrapper.instance().handleOutsideClick({ target: {} });
    expect(onOutsideClick.mock.calls.length).toBe(1);
  });

  it('should calls componentWillUnmount', () => {
    const spy = jest.spyOn(OutsideClickHandler.prototype, 'componentWillUnmount');
    const wrapper = mount(<OutsideClickHandler />);
    wrapper.unmount();
    expect(spy.mock.calls.length).toBe(1);
  });
});
