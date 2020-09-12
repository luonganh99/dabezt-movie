export default function formatNumber(num) {
    // let result = '';
    // let arr = num.toString().split('');

    // for (let i = arr.length - 1; i >= 0; i-=3) {
    //     result = arr[i+1] + arr[i+2] + arr[i+3] + result;
    // }
    // return result;
    return '$ ' + num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}
