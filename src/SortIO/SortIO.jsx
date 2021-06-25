import React from 'react';
import {getMergeSortAnimations} from '../SortingAlgo/SortingAlgo.js';
import {getBubbleSortAnimations} from '../SortingAlgo/SortingAlgo.js'
import {getSelectionSortAnimations} from '../SortingAlgo/SortingAlgo.js'
import {getQuickSortAnimations} from '../SortingAlgo/SortingAlgo.js'
import './SortIO.css';


const ANIMATION_SPEED_MS = 2 ;
const NUMBER_OF_ARRAY_BARS = 130;
const PRIMARY_COLOR = 'white';
const SECONDARY_COLOR = 'black';

export default class SortIO extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      array: [],
  };
}

  componentDidMount() {
    this.resetArray();
  }

  resetArray() {
    const array = [];
    for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
      array.push(randomIntFromInterval(10, 500));
    }
    this.setState({array});
  }

  mergeSort() {
    const animations = getMergeSortAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
}

  quickSort() {
    const animations = getQuickSortAnimations(this.state.array);
    let pos=-1;
    let j=0;
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const [barOneIdx, barTwoIdx] = animations[i];
      if(barOneIdx==-1 && barTwoIdx==-1) pos=i+1;
      else if(i==pos){
        setTimeout(() => {
            const [barOneIdx, newHeight] = animations[i];
            const barOneStyle = arrayBars[barOneIdx].style;
            barOneStyle.height = `${newHeight}px`;
          }, i * ANIMATION_SPEED_MS)
      }
      else{
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = j % 2 == 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        j++;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      }
    }
  }

  selectionSort() {
    const animations = getSelectionSortAnimations(this.state.array);
    let j=0;
    let pos=-1;
    for (let i = 0; i < animations.length; i++) {
      
      const arrayBars = document.getElementsByClassName('array-bar');
      const [barOneIdx, barTwoIdx] = animations[i];
      if(barOneIdx==-1 && barTwoIdx==-1) pos= i+1;
      else if(i==pos)
      {
        setTimeout(() => {
            const [barOneIdx, newHeight] = animations[i];
            const barOneStyle = arrayBars[barOneIdx].style;
            barOneStyle.height = `${newHeight}px`;
          }, i * ANIMATION_SPEED_MS);
      }
      else{
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = j % 2 == 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        j++;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      }
      
    }
}

  bubbleSort() {

    const animations = getBubbleSortAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const isColorChange = (i % 4) <= 1;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 4 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
}


  render() {
    const {array} = this.state;

    return (
      <div className="array-container">
        {array.map((value, idx) => (
          <div
            className="array-bar"
            key={idx}
            style={{
              backgroundColor: PRIMARY_COLOR,
              height: `${value}px`,
            }}></div>
        ))}
        <br></br>
        <button class="buton" onClick={() => this.resetArray()}>Generate New Array</button>
        <button class="buton" onClick={() => this.mergeSort()}>Merge Sort</button>
        <button class="buton" onClick={() => this.quickSort()}>Quick Sort</button>
        <button class="buton" onClick={() => this.selectionSort()}>Selection Sort</button>
        <button class="buton" onClick={() => this.bubbleSort()}>Bubble Sort</button>
      </div>
    );
  }
}

// From https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}
