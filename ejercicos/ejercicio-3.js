
function ordenAsc(array) {
    if (array.length <= 1) {
      return true;
    }
    for (let i = 1; i < array.length; i++) {
      if (array[i] < array[i - 1]) {
        return false;
      }
    }
    return true;
  }


  console.log(ordenAsc([1,2,3,6,7,19]))
  console.log(ordenAsc([12,2,9,6,7,19]))
  console.log(ordenAsc([4]))