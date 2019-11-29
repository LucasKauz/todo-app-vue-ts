import { shallowMount } from '@vue/test-utils'
import CloseButton from '@/components/CloseButton.vue'

describe('CloseButton.vue', () => {
  it('calls onClick function when clicked', () => {
    const onClick = jest.fn()
    const wrapper = shallowMount(CloseButton, {
      propsData: { onClick }
    })
    wrapper.find('.CloseIcon').trigger('click')
    expect(onClick).toHaveBeenCalled()
  })
})
