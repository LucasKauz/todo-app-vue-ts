import { shallowMount } from '@vue/test-utils'

import TaskItem from '@/components/TaskItem.vue'

const defaultTask = {
  title: 'Default task',
  id: '123-321',
  dueDate: '2019-01-13',
  comments: [],
  comment: ''
}

const defaultFunctionProps = {
  editTask: jest.fn(),
  viewTask: jest.fn(),
  toggleListTask: jest.fn()
}

describe('TaskItem.vue', () => {
  it('shows due date in format DD/MM/YY', () => {
    const wrapper = shallowMount(TaskItem, {
      propsData: {
        ...defaultFunctionProps,
        task: {
          ...defaultTask,
          dueDate: '1992-12-03'
        }
      }
    })

    expect(wrapper.find('.TaskItem__dueDate').text()).toContain('03/12/1992')
  })
  it('calls editTask function when edit is clicked', () => {
    const wrapper = shallowMount(TaskItem, {
      propsData: {
        ...defaultFunctionProps,
        task: defaultTask
      }
    })

    wrapper.find('.TaskItem__edit').trigger('click')

    expect(defaultFunctionProps.editTask).toHaveBeenCalled()
  })

  it('calls viewTask function when comment icon is clicked', () => {
    const wrapper = shallowMount(TaskItem, {
      propsData: {
        ...defaultFunctionProps,
        task: defaultTask
      }
    })

    wrapper.find('.TaskItem__comment').trigger('click')

    expect(defaultFunctionProps.viewTask).toHaveBeenCalled()
  })

  it('select task when check icon is clicked', () => {
    const wrapper = shallowMount(TaskItem, {
      propsData: {
        ...defaultFunctionProps,
        task: defaultTask
      }
    })

    wrapper.find('.TaskItem__square').trigger('click')

    // Calls the parent toggleListTask function
    expect(defaultFunctionProps.toggleListTask).toHaveBeenCalled()
    // Change the selected prop
    expect((wrapper.vm as any).isSelected).toBe(true)
  })
})
