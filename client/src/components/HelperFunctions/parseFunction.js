
//takes a list of items that need to be displayed,
//returns an array of sets of three of that list
export default function parseFunction(list) {
    let setsOfThree = []
    for (let step = 0; step < list.length; step = step + 3) {
        let newDisplaySet = []
        for(let upToThree = 0; upToThree < 3; upToThree ++) {
            if (list[step + upToThree]) {newDisplaySet.push(list[step + upToThree])}
        }
        setsOfThree.push(newDisplaySet)
    }
    return setsOfThree
}