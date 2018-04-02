$(document).ready(function () {

    $(".loader-gif2").hide()
    $("#jsPoints").hide()
    $(".loader-gif").show()

    let stringToDOM = "";

    $("#classBtn").on("click", function (event) {
        let jsonAddress = event.target.id
        if(jsonAddress.startsWith("c__")){
            $("#output").html("")
            let cohort = `./c${jsonAddress.split("__")[1]}.json`
            getStudentData(cohort)
        }
    })

    function getStudentData(cohort) {
        $(".loader-gif").hide()
        $(".loader-gif2").show()

        $.ajax({
                type: "GET",
                url: cohort
            })
            .then(students => {
                let counter = 0;
                const arrayOfPromises = []
                let allStudents = []
                stringToDOM = ""

                //an ajax call is created for each student in the json file and pushed to the arrayofPromises
                students.forEach(student => {
                    arrayOfPromises.push(
                        $.ajax({
                            type: "GET",
                            url: `https://spyproxy.bangazon.com/student/commit/https://api.github.com/users/${student.githubHandle}/events`
                        }).done(response => {
                            if(response.message === "Not found"){
                                console.log(student)
                            }
                        })
                    )
                })

                Promise.all(arrayOfPromises).then(responses => {
                    responses.forEach(data => {

                        let pushEvent = data.find(event => {
                            return event.type === "PushEvent"
                        })

                        let studentName = students.find(student => {
                            return student.githubHandle === data[0].actor.login
                        })

                        let lastPush = new Date(pushEvent.created_at)
                        let today = new Date(Date.now())

                        let studentData = {
                            name: studentName.name,
                            githubHandle: pushEvent.actor.login,
                            repo: pushEvent.repo.name.split("/")[1],
                            date: parseInt((today - lastPush) / (1000 * 60 * 60 * 24)),
                            message: `"${pushEvent.payload.commits[pushEvent.payload.commits.length - 1].message}"`,
                            repoURL: pushEvent.repo.url.split("repos/")[1],
                            diffDays: parseInt((today - lastPush) / (1000 * 60 * 60 * 24)) + " days ago",
                        }

                        if (data[0].type === "ForkEvent") {
                            let forkDate = new Date(data[0].payload.forkee.pushed_at)
                            studentData.diffDays = parseInt((today - forkDate) / (1000 * 60 * 60 * 24)) + " days ago"
                            studentData.event = "fork"
                            studentData.date = parseInt((today - forkDate) / (1000 * 60 * 60 * 24))
                            studentData.repo = data[0].repo.name.split("/")[1]
                            studentData.message = "-"
                            studentData.repoURL = data[0].repo.url.split("repos/")[1]
                        }

                        switch (studentData.diffDays) {
                            case 0 + " days ago":
                                studentData.diffDays = "today"
                                studentData.color = "green"
                                break;
                            case 1 + " days ago":
                                studentData.diffDays = "yesterday"
                                studentData.color = "green"
                                break;
                            case 2 + " days ago":
                            case 3 + " days ago":
                                studentData.color = "yellow"
                                break;
                            default:
                                studentData.color = "red"
                                break;
                        }

                        allStudents.push(studentData)
                    }), err => {
                        console.error("promise No "+err.index+" failed with ", err);
                    };

                    allStudents.sort(function(a,b){
                        return new Date(a.date) - new Date(b.date);
                    });

                    $(".loader-gif2").hide()


                    //loop over studentData objects and print them to the page in a boostrap grid - the row divs clearly caused me issues
                    allStudents.forEach(student => {
                        if (counter === 0) {
                            stringToDOM += `<div class="row">`
                        }

                        if (counter % 4 === 0) {
                            stringToDOM += `</div>`
                            stringToDOM += `<div class="row">`
                        }

                        counter++
                        printToDOM(student)
                    })
                })

            })
    }


    function printToDOM(student) {
        let event = (student.event === "fork") ? "Forked a repo " : "Pushed to GitHub "

        stringToDOM += `
            <div class="card center col">
                <div class="card-body">
                    <h4>${student.name}</h4>
                    <p class="${student.color}">${event} ${student.diffDays}</p>
                    <a href="https://github.com/${student.repoURL}" target="_blank"><p style="color:black;">${student.repo}</p></a>
                    <p>${student.message}</p>
                    <a href="https://github.com/${student.githubHandle}" target="_blank">Student's Repo</a>
                </div>
            </div>`


        $("#output").html(stringToDOM)
    }

})

// url: `https://student-github-tracker.heroku.com/student/commit/https://api.github.com/users/${currentStudent.githubHandle}/events`,