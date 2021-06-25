export function getBubbleSortAnimations(array){
    const animations = [];
    if (array.length <= 1) return array;
    BubbleSortHelper(array, 0, array.length, animations);
    return animations;
  }

export function getSelectionSortAnimations(array){
    const animations = [];
    if (array.length <= 1) return array;
    SelectionSortHelper(array, 0, array.length, animations);
    return animations;
  }

  export function getQuickSortAnimations(array){
    const animations = [];
    if (array.length <= 1) return array;
    QuickSortHelper(array, 0, array.length-1, animations);
    return animations;
  }

export function getMergeSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;
    const auxiliaryArray = array.slice();
    mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
    return animations;
  }

  
  function mergeSortHelper(
    mainArray,
    startIdx,
    endIdx,
    auxiliaryArray,
    animations,
  ) {
    if (startIdx === endIdx) return;
    const middleIdx = Math.floor((startIdx + endIdx) / 2);
    mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
    mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
    doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
  }
  
  function doMerge(
    mainArray,
    startIdx,
    middleIdx,
    endIdx,
    auxiliaryArray,
    animations,
  ) {
    let k = startIdx;
    let i = startIdx;
    let j = middleIdx + 1;
    while (i <= middleIdx && j <= endIdx) {
      animations.push([i, j]);
      animations.push([i, j]);
      if (auxiliaryArray[i] <= auxiliaryArray[j]) {
        animations.push([k, auxiliaryArray[i]]);
        mainArray[k++] = auxiliaryArray[i++];
      } else {
        animations.push([k, auxiliaryArray[j]]);
        mainArray[k++] = auxiliaryArray[j++];
      }
    }
    while (i <= middleIdx) {
      animations.push([i, i]);
      animations.push([i, i]);
      animations.push([k, auxiliaryArray[i]]);
      mainArray[k++] = auxiliaryArray[i++];
    }
    while (j <= endIdx) {
      animations.push([j, j]);
      animations.push([j, j]);
      animations.push([k, auxiliaryArray[j]]);
      mainArray[k++] = auxiliaryArray[j++];
    }
  }

  function BubbleSortHelper(
    mArray,
    startIdx,
    endIdx,
    animations,
  ) {
    if (startIdx == endIdx) return;
    for(let i = startIdx ; i < endIdx ; i++){
        for(let j = startIdx ; j < endIdx-i-1 ; j++){
            animations.push([j, j+1]);
            animations.push([j, j+1]);
            if (mArray[j] > mArray[j+1]){
                animations.push([j, mArray[j+1]]);
                animations.push([j+1,mArray[j]]);
                let temp = mArray[j];
                mArray[j] = mArray[j+1];
                mArray[j+1] = temp;
            }
            else{ animations.push([j,mArray[j]]);
                animations.push([j,mArray[j]]);
            }
        }
    }
  }

  function SelectionSortHelper(
    arr,
    startIdx,
    endIdx,
    animations,
  ) {
    if (startIdx == endIdx) return;
    for(let i = startIdx ; i < endIdx ; i++){
        let min= i;
        for(let j = i + 1 ; j < endIdx ; j++){
            animations.push([i, j]);
            animations.push([i, j]);
            if (arr[j] < arr[min])
            {
                min = j;
            }
            }
            
            if(min!=i)
            {
                let tmp=arr[min];
                animations.push([-1, -1]);
                animations.push([min, arr[i]]);
                animations.push([-1, -1]);
                animations.push([i, tmp]);
                arr[min]=arr[i];
                arr[i]=tmp;
            }
        }
    }

    function QuickSortHelper(
        items, 
        left, 
        right,
        animations) {
        var index;
        if (items.length > 1) {
            index = partition(items, left, right,animations); //index returned from partition
            if (left < index - 1) { //more elements on the left side of the pivot
                QuickSortHelper(items, left, index - 1, animations);
            }
            if (index < right) { //more elements on the right side of the pivot
                QuickSortHelper(items, index, right, animations);
            }
        }
    }


    function partition(items, left, right, animations) {

        var pivot = items[Math.floor((right + left) / 2)];
        var piv = Math.floor((right + left) / 2);
        var i = left;
        var j = right;
        while (i <= j) {
            while (items[i] < pivot) {
                animations.push([i, piv]);
                animations.push([i, piv]);
                i++;
            }
            while (items[j] > pivot) {
                animations.push([j, piv]);
                animations.push([j, piv]);
                j--;
            }
            if (i <= j) {
                animations.push([-1, -1]);
                animations.push([i, items[j]]);
                animations.push([-1, -1]);
                animations.push([j, items[i]]);
                swap(items, i, j);
                i++;
                j--;
            }
        }
        return i;
    }

    function swap(items, leftIndex, rightIndex){
        var temp = items[leftIndex];
        items[leftIndex] = items[rightIndex];
        items[rightIndex] = temp;
    }