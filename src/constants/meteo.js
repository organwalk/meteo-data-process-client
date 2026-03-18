export const METEO_ELEMENT_OPTIONS = [
  { value: '1', label: '温度' },
  { value: '2', label: '湿度' },
  { value: '3', label: '风速' },
  { value: '4', label: '风向' },
  { value: '5', label: '降雨量' },
  { value: '6', label: '光照' },
  { value: '7', label: 'PM25' },
  { value: '8', label: 'PM10' },
]

export const METEO_ELEMENT_LABEL_MAP = METEO_ELEMENT_OPTIONS.reduce((result, item) => {
  result[item.value] = item.label
  return result
}, {})

export const METEO_TABLE_HEADER = ['时间', ...METEO_ELEMENT_OPTIONS.map((item) => item.label)]
