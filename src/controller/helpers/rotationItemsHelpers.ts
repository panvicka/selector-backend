export const filterByDate = (
    potentialMatches: any,
    daysSince: any,
    referenceDate: Date
) => {
    if (daysSince > 0) {
        let filteredMatches: any = [];
        let dateNow = referenceDate;
        let dateNowMinusDays = referenceDate;
        dateNowMinusDays.setDate(dateNow.getDate() - daysSince);
        console.log("today's date: " + dateNow);
        console.log('days since: ' + daysSince);
        console.log(
            'looking for people who have not done the role since: ' +
                dateNowMinusDays
        );
        potentialMatches.forEach((match: any) => {
            if (match.latestDate < dateNowMinusDays) {
                filteredMatches.push(match);
            } else if (match.latestDate === null) {
                filteredMatches.push(match);
            }
        });
        return filteredMatches;
    } else {
        return potentialMatches;
    }
};

export const filterByLessThenAverageAttendance = (potentialMatches: any) => {
    let filteredMatches: any = [];

    const averageAttendance = Math.ceil(
        potentialMatches.reduce(
            (acc: any, curr: any) => acc + curr.attended,
            0
        ) / potentialMatches.length
    );
    console.log('average attendance: ' + averageAttendance);

    potentialMatches.forEach((match: any) => {
        if (match.attended < averageAttendance) {
            filteredMatches.push(match);
        }
    });
    return filteredMatches;
};

export const filterPeoplePlannedInFutureEvents = (
    potentialMatches: any,
    referenceDate: Date
) => {
    let filteredMatches: any = [];
    potentialMatches.forEach((match: any) => {
        if (match.dates.find((date: any) => date > referenceDate)) {
        } else {
            filteredMatches.push(match);
        }
    });
    return filteredMatches;
};

export const filterPeopleWhoHasNotDoneTheRole = (potentialMatches: any) => {
    let filteredMatches: any = [];
    potentialMatches.forEach((match: any) => {
        if (match.attended !== 0) {
            filteredMatches.push(match);
        }
    });

    return filteredMatches;
};
