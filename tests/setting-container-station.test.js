import { shallowMount } from '@vue/test-utils'
import SettingContainerStation from '@/components/body/model-prediction-pages/container/model-setting/setting-container-station.vue'

describe('SettingContainerStation', () => {
  it('emits update:modelValue when station changes', async () => {
    const wrapper = shallowMount(SettingContainerStation, {
      props: {
        modelValue: 'A001',
        stationList: [
          { station: 'A001', name: '站点一' },
          { station: 'A002', name: '站点二' },
        ],
      },
      global: {
        stubs: {
          'el-form-item': {
            name: 'ElFormItem',
            template: '<div><slot /></div>',
          },
          'el-select': {
            name: 'ElSelect',
            props: ['modelValue'],
            emits: ['update:modelValue'],
            template: '<div />',
          },
          'el-option': {
            name: 'ElOption',
            template: '<div />',
          },
        },
      },
    })

    await wrapper.findComponent({ name: 'ElSelect' }).vm.$emit('update:modelValue', 'A002')
    expect(wrapper.emitted('update:modelValue')).toEqual([['A002']])
  })
})
