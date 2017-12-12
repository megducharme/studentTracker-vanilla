$(document).ready(function () {


    let students = [{
            name: "Chase Steeley",
            githubHandle: "ChaseSteely"
        },
        {
            name: "Chris Miller",
            githubHandle: "camilleryr"
        },
        {
            name: "Courtney Seward",
            githubHandle: "cseward1"
        },
        {
            name: "Deanna Vickers",
            githubHandle: "Deanna2000"
        },
        {
            name: "Erin Agobert",
            githubHandle: "eagobert"
        },
        {
            name: "Garrett Ward",
            githubHandle: "Gward2489"
        },
        {
            name: "Greg Lawrence",
            githubHandle: "chewieez"
        },
        {
            name: "Greg Turner",
            githubHandle: "Greg-Turner"
        },
        {
            name: "Jason Figueroa",
            githubHandle: "jasonfigueroa"
        },
        {
            name: "Jenna Solis",
            githubHandle: "jennabsol"
        },
        {
            name: "Jesse Page",
            githubHandle: "JPage4"
        },
        {
            name: "John Dulaney",
            githubHandle: "odn86"
        },
        {
            name: "Keith Davis",
            githubHandle: "MidbossK"
        },
        {
            name: "Kevin Haggerty",
            githubHandle: "kghaggerty"
        },
        {
            name: "Kimberly Bird",
            githubHandle: "Kimberly-bird"
        },
        {
            name: "Kolden Prue",
            githubHandle: "KAPrueved"
        },
        {
            name: "Kristen",
            githubHandle: "Norris"
        },
        {
            name: "Krys Manthis",
            githubHandle: "krysmathis"
        },
        {
            name: "Leah Duvic",
            githubHandle: "leahduvic"
        },
        {
            name: "Lissa Goforth",
            githubHandle: "lissagoforth"
        },
        {
            name: "Max Wolf",
            githubHandle: "maxcwolf"
        },
        {
            name: "Paul Ellis",
            githubHandle: "tynesellis"
        },
        {
            name: "Ray Medrano",
            githubHandle: "rmbw74"
        },
        {
            name: "Ryan McPherson",
            githubHandle: "mmcpher2"
        },
        {
            name: "Sean Williams",
            githubHandle: "Dacamor"
        },
        {
            name: "Tyler Bowman",
            githubHandle: "tgbowman"
        }
    ]

    students.forEach(currentStudent => {

        $.ajax({
            type: "GET",
            url: `http://localhost:6060/student/commit/https://api.github.com/users/${currentStudent.githubHandle}/events`,
            success: function (data) {
                let lastCommit = data.find(event => {
                    return event.type === "PushEvent"
                })
                console.log(lastCommit)

                let lastPush = new Date((lastCommit.created_at))
                let today = new Date(Date.now())
                let diffDays = parseInt((today - lastPush) / (1000 * 60 * 60 * 24)) + " days ago"

                let repo = lastCommit.repo.name
                let message = lastCommit.payload.commits[0].message

                let color = "red"

                if (diffDays === 0 + " days ago") {
                    diffDays = "today"
                    color = "green"
                }
                
                document.getElementById("output").innerHTML += `
                <div>
                    <h3>${currentStudent.name}</h3>
                    <h4 class="${color}">Last push was ${diffDays}</h4>
                    <h4>REPO: ${repo}</h4>
                    <h4>MESSAGE: "${message}"</h4>
                    <a href="https://github.com/${currentStudent.githubHandle}">Go to their repo</h4></a>

                </div><br>
                <hr>
                `
            }
        })
    })

    // $.ajax({
    //     type: "GET",
    //     url: `http://localhost:6060/student/commit/https://api.github.com/users/cseward1/events`,
    //     success: function(data){
    //         console.log("data", data)
    //         let lastPush = new Date((data[0].created_at))
    //         let today = new Date(Date.now())
    //         let diffDays = parseInt((today - lastPush) / (1000 * 60 * 60 * 24))

    //         let repo = data[0].repo.name
    //         let message = data[0].payload.commits[0].message
    //         document.getElementById("output").innerHTML += `
    //         <div>
    //             <h3><strong>Meg Ducharme</strong></h3>
    //             <h4>Last push was ${diffDays} days ago</h4>
    //             <h4>REPO: ${repo}</h4>
    //             <h4>MESSAGE: "${message}"</h4>
    //         </div>
    //         `
    //     }
    // });

    // $.ajax({
    //     type: "GET",
    //     url: `http://localhost:6060/student/commit/https://api.github.com/users/megducharme/events`,
    //     success: function(data){
    //         console.log("data", data)
    //         let lastPush = new Date((data[0].created_at))
    //         let today = new Date(Date.now())
    //         let diffDays = parseInt((today - lastPush) / (1000 * 60 * 60 * 24))

    //         let repo = data[0].repo.name
    //         let message = data[0].payload.commits[0].message
    //         document.getElementById("output").innerHTML += `
    //         <div>
    //             <h3><strong>Meg Ducharme</strong></h3>
    //             <h4>Last push was ${diffDays} days ago</h4>
    //             <h4>REPO: ${repo}</h4>
    //             <h4>MESSAGE: "${message}"</h4>
    //         </div>
    //         `
    //     }
    // });



})