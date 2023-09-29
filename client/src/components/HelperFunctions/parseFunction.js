
//takes a list of items that need to be displayed,
//returns an array of sets of three of that list
export default function parseFunction(list) {
    let setsOfThree = []
    for (let step = 0; step < list.length; step = step + 3) {
        let newDisplaySet = []
        for(let upToThree = 0; upToThree < 3; upToThree ++) {
            if (list[step]) {newDisplaySet.push(list[step])}
        }
        console.log(newDisplaySet)//TODO
    }
    console.log(setsOfThree)//TODO
    return setsOfThree
}