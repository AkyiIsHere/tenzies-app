// 1. const numbers = [1,2,3,4,5,6];
//     numbers.forEach(item => {
//         if(!item%2){
//             continue;
//         }
//         console.log(item);
//     })

// 2. const numbers = [2, 4, 6, 7, 8, 10];
//     numbers.forEach(item => {
//         if(item === 7){
//             console.log("Found!");
//             break;
//         }
//     })

  const nums1 = [1, 5, 9, 3];      // should return true
    const nums2 = [4, -1, 7, 10];    // should return false

    function checkPositiveNum(arr){
        let result = true;
        arr.forEach(item => {
            if(item<0){
                return result = false;
            }
        })
    }

    checkPositiveNum(nums1);