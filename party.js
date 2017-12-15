
let celebration = Party.create(null, {
    "location": {
        value: "724 Croley Drive Nashville, TN",
        writeable: false,
        enumerable: true
    },
    "games": {
        value: ["JackBox.tv", "stump", "cards", "coding"],
        writeable: true,
        enumerable: true
    },
    "time": {
        value: "6:30pm, or whenever",
        writeable: false,
        enumberable: true
    },
    "invite": {
        value: (classmates) => {
            classmates.forEach((mate) => {
                console.log("have so much fun!")
            })
        }
    },
    "whatToBring": {
        value: (thing) => {
            console.log(`Don't forget your ${thing}!`)
        }
    }
})

celebration.whatToBring("significant other")
celebration.whatToBring("drink")
celebration.invite(["all", "you", "guys!"])
celebration.games.push("drinking adult beverages")

