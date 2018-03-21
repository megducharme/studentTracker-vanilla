$(document).ready(function () {

    let students = ["kyleducharme", "danielaagnoletti", "rachaelbabcock2", "coledoster", "deannavickers", "jessicaswift", "levischubert", "rafc", "DanielBeecroft", "katherynford", "seanirwin", "johnmccoy2", "patrickmurphy2", "williamprater", "jacobsmith10", "dejanstjepanovic", "rileymathews", "hayleylandsberg", "jeremiahpritchard", "jonathanriggs", "joshuabarton", "ronnieyoung", "paulzimmermanclayton", "meghandebity", "davidpaul2", "jakecarter"]
    let output = ""

    let arrayOfPromises = []
    let studentPoints = []
    let studentJsPoints = []

    $("#c25").click(function () {
        arrayOfPromises = []
        studentJsPoints = []
        studentPoints = []
        output = ""

        $(".loader-gif").hide()
        $(".loader-gif2").show()

        students.forEach(student => {
            arrayOfPromises.push(
                $.ajax({
                    type: "GET",
                    url: `https://teamtreehouse.com/${student}.json`
                })
            )
        })

        console.log("number of promises", arrayOfPromises.length)

        Promise.all(arrayOfPromises).then(responses => {
            responses.forEach(data => {

                let studentData = {
                    name: data.name,
                    totalPoints: data.points.total,
                    jsPoints: data.points.JavaScript,
                    cssPoints: data.points.CSS,
                    htmlPoints: data.points.HTML,
                    pythonPoints: data.points.Python,
                    totalFEpoints: (data.points.JavaScript + data.points.CSS + data.points.HTML),
                    color: "red"
                }

                if (studentData.totalFEpoints < 3000 && studentData.totalFEpoints > 2000) {
                    studentData.color = "yellow"
                } else if (studentData.totalFEpoints > 3000) {
                    studentData.color = "green"
                }

                studentPoints.push(studentData)

            })

            studentPoints.sort(function (a, b) {
                return b.totalFEpoints - a.totalFEpoints
            });

            console.log(studentPoints)

            $(".loader-gif2").hide()
            $("#jsPoints").show()

            let counter = 0;
            studentPoints.forEach(student => {
                if (counter === 0) {
                    output += `<div class="row">`
                }

                if (counter % 4 === 0) {
                    output += `</div>`
                    output += `<div class="row">`
                }

                counter++
                printToDom(student)
            })

            $("#output").html(output);
        })

    });

    function printToDom(studentData) {
        output +=
            `<div class="card center col">
                <div class="card-body">
                    <strong><h3>${studentData.name}</h3></strong>
                    <div class="navy">
                    Python points: ${studentData.pythonPoints}
                    </div>
                    <div>
                    JavaScript points: ${studentData.jsPoints}
                    </div>
                    <div>
                    CSS points: ${studentData.cssPoints}
                    </div>
                    <div>
                    HTML points: ${studentData.htmlPoints}
                    </div>
                    <i>Total Treehouse Points: ${studentData.totalPoints}</i>
                    <div class=${studentData.color}>
                        Total Front End Points: ${studentData.jsPoints + studentData.cssPoints + studentData.htmlPoints}
                    </div>
                </div>
            </div>
            <br>`
    }

    function sortByJs() { 
        return studentPoints.slice(0).sort(function (a, b) {
            return b.jsPoints - a.jsPoints
        });
    }

    $("#jsPoints").click(function(){
        let students = sortByJs()
        console.log("sort by JS points")
        console.log("student js points", studentJsPoints)
        output = ""
        let counter = 0;

        students.forEach(student => {
            if (counter === 0) {
                output += `<div class="row">`
            }

            if (counter % 4 === 0) {
                output += `</div>`
                output += `<div class="row">`
            }

            counter++
            printToDom(student)
        })

        $("#output").html(output);
    })
});