import { Groupes } from '../Groups/groups';
import { Roles } from '../Roles/roles';

export const Items = {
    // longer then one day, has fixed length of 2 days, doesnt happen regularly
    RegularDarthVaderAttack: 0,
    // takes only one day
    StarShipNews: 1,
    // longer then one day, has fixed length of 7 days, happens regularly
    CleaningDuty: 2,
    // longer then one day, doesnt have fixed length, doesnt happen regularly
    DeathStarInspection: 3,
};

export const getItems = (testRolesWithId, testGroupsWithId) => {
    const testItems = [];
    testItems[Items.RegularDarthVaderAttack] = {
        name: 'Regular alliance attack on Darth Vader',
        description: 'Regular attack to keep him on his toes',
        longDescription:
            'Happens in the middle of the night, takes two days, irregularly',
        roles: [
            testRolesWithId[Roles.MainAssasin]._id,
            testRolesWithId[Roles.SupportAssasin]._id,
        ],
        isLongerThenOneDay: true,
        usualLength: 2,
        hasAutomaticStartDate: false,
        groupes: [testGroupsWithId[Groupes.Alliance]._id],
    };
    testItems[Items.StarShipNews] = {
        name: 'Starship news',
        description:
            'Everyone from the galaxy is welcomed! One person gives a presentation about starships',
        longDescription: 'Happens on planet EX-42, takes only few hours',
        roles: [testRolesWithId[Roles.Presenter]._id],
        isLongerThenOneDay: false,
        groupes: [testGroupsWithId[Groupes.StarShipLovers]._id],
    };
    testItems[Items.CleaningDuty] = {
        name: 'Cleaning duty',
        description: 'Cleans the Millennium Falcon',
        longDescription:
            'For one week the crew cleans kitchen, bathroom, living room, nuclear reactor, etc.',
        roles: [testRolesWithId[Roles.Cleaner]._id],
        isLongerThenOneDay: true,
        hasAutomaticStartDate: true,
        usualLength: 7,
        groupes: [testGroupsWithId[Groupes.StarShipLovers]._id],
    };
    testItems[Items.CleaningDuty] = {
        name: 'Falcon cleaning duty',
        description: 'Cleans the Millennium Falcon',
        longDescription:
            'For one week clean kitchen, bathroom, living room, nuclear reactor, etc.',
        roles: [testRolesWithId[Roles.Cleaner]._id],
        isLongerThenOneDay: true,
        hasAutomaticStartDate: true,
        usualLength: 7,
        groupes: [testGroupsWithId[Groupes.Alliance]._id],
    };
    testItems[Items.DeathStarInspection] = {
        name: 'Death Start Inspection',
        description: 'When the red LED blinks, check the Death Star',
        longDescription:
            'Take as much time as you need, but make sure everything is working properly',
        roles: [testRolesWithId[Roles.Inspector]._id],
        isLongerThenOneDay: true,
        hasAutomaticStartDate: false,
        groupes: [testGroupsWithId[Groupes.Empire]._id],
    };

    return testItems;
};
