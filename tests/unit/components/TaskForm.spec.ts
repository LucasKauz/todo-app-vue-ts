import Vue from 'vue'

import { shallowMount } from '@vue/test-utils'

import TaskForm from '@/components/TaskForm.vue'

const defaultProps = {
  getCurrentTask: () => {},
  dispatchForm: () => {},
  closeModal: () => {},
  isEdit: false
}

const setup = (props = {}) => {
  return shallowMount(TaskForm, {
    propsData: {
      ...defaultProps,
      ...props
    }
  })
}

describe('TaskForm.vue', () => {
  it('has a title error when the title changes to empty', () => {
    const wrapper = setup()

    wrapper.find('#title').setValue('')
    wrapper.find('#title').trigger('change')

    expect((wrapper.vm as any).titleError).not.toHaveLength(0)
  })

  it('has a day error when the day changes an invalid value', () => {
    const wrapper = setup()

    wrapper.find('[name=day]').setValue('0')

    expect((wrapper.vm as any).dayError).toBe(true)
  })

  it('do not have a day error when the day changes a valid value', () => {
    const wrapper = setup()

    wrapper.find('[name=day]').setValue('20')

    expect((wrapper.vm as any).dayError).toBe(false)
  })

  it('has a month error only when the month changes an invalid value', () => {
    const wrapper = setup()

    wrapper.find('[name=month]').setValue('0')

    expect((wrapper.vm as any).monthError).toBe(true)

    wrapper.find('[name=month]').setValue('13')

    expect((wrapper.vm as any).monthError).toBe(true)
  })

  it('do not have a month error when the month changes a valid value', () => {
    const wrapper = setup()

    wrapper.find('[name=month]').setValue('10')

    expect((wrapper.vm as any).monthError).toBe(false)
  })

  it('has a year error only when the year changes an invalid value', () => {
    const wrapper = setup()

    wrapper.find('[name=year]').setValue('0')

    expect((wrapper.vm as any).yearError).toBe(true)
  })

  it('do not have a year error only when the year changes a valid value', () => {
    const wrapper = setup()

    wrapper.find('[name=year]').setValue('2019')

    expect((wrapper.vm as any).yearError).toBe(false)
  })

  it('has a dueDate error when all date parts are filled but wrongfuly', () => {
    const wrapper = setup()
    wrapper.setData({
      day: '03',
      month: '12',
      year: 'xxxx'
    })
    expect((wrapper.vm as any).dueDateError).not.toHaveLength(0)
  })

  it('do not have a dueDate error when the date is set correctly', () => {
    const wrapper = setup()
    wrapper.setData({
      day: '03',
      month: '12',
      year: '2019'
    })
    expect((wrapper.vm as any).dueDateError).toHaveLength(0)
  })

  it('submit form when data is correct', () => {
    const dispatchForm = jest.fn()
    const wrapper = setup({
      dispatchForm
    })
    wrapper.setData({
      title: 'Lucas',
      dueDate: '2019-03-12'
    })
    wrapper.find('.TaskForm').trigger('submit')
    expect(dispatchForm).toHaveBeenCalled()
  })

  it('do not submit form when title is empty', () => {
    const dispatchForm = jest.fn()
    const wrapper = setup({
      dispatchForm
    })
    wrapper.setData({
      title: '',
      dueDate: '2019-03-12'
    })
    wrapper.find('.TaskForm').trigger('submit')
    expect(dispatchForm).not.toHaveBeenCalled()
  })

  it('do not submit form when date is incorrect', () => {
    let dispatchForm = jest.fn()
    const wrapper = setup({
      dispatchForm
    })
    wrapper.setData({
      title: 'Lucas',
      dueDate: '20ç19-03-12'
    })
    wrapper.find('.TaskForm').trigger('submit')
    expect(dispatchForm).not.toHaveBeenCalled()
  })
})
