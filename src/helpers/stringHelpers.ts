export const capitalizeFirstLetter = (value: string | undefined) => {
    if (!value) return undefined
    try {
      return value.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase() })
    } catch (error) {
      console.log(error)
    }
  }