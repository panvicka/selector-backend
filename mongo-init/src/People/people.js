import { Groupes } from '../Groups/groups';
import { Items } from '../Items/items';

export const People = {
    ObiWan: 0,
    Anakin: 1,
    Mace: 2,
    Palpatine: 3,
    Veers: 4,
    C3PO: 5,
    Solo: 6,
    Chewbacca: 7,
    Asoka: 8,
    Ackbar: 9,
};

export const getpeople = (testItemsWithId, testGroupsWithId) => {
    const testPeople = [];
    testPeople[People.ObiWan] = {
        name: 'Obi-Wan Kenobi',
        active: true,
        itemsCanBeAttended: [
            testItemsWithId[Items.RegularDarthVaderAttack]._id,
            testItemsWithId[Items.StarShipNews]._id,
            testItemsWithId[Items.CleaningDuty]._id,
        ],
        groupes: [
            testGroupsWithId[Groupes.Alliance]._id,
            testGroupsWithId[Groupes.StarShipLovers]._id,
        ],
    };

    testPeople[People.Anakin] = {
        name: 'Anakin Skywalker',
        active: false,
        itemsCanBeAttended: [
            testItemsWithId[Items.StarShipNews]._id,
            testItemsWithId[Items.CleaningDuty]._id,
        ],
        groupes: [
            testGroupsWithId[Groupes.Alliance]._id,
            testGroupsWithId[Groupes.StarShipLovers]._id,
        ],
    };

    testPeople[People.Mace] = {
        name: 'Mace Windu',
        active: true,
        itemsCanBeAttended: [
            testItemsWithId[Items.RegularDarthVaderAttack]._id,
            testItemsWithId[Items.StarShipNews]._id,
            testItemsWithId[Items.CleaningDuty]._id,
        ],
        groupes: [
            testGroupsWithId[Groupes.Alliance]._id,
            testGroupsWithId[Groupes.StarShipLovers]._id,
        ],
    };

    testPeople[People.Palpatine] = {
        name: 'Palpatine',
        active: true,
        itemsCanBeAttended: [
            testItemsWithId[Items.StarShipNews]._id,
            testItemsWithId[Items.DeathStarInspection]._id,
        ],
        groupes: [
            testGroupsWithId[Groupes.Empire]._id,
            testGroupsWithId[Groupes.StarShipLovers]._id,
        ],
    };

    testPeople[People.Veers] = {
        name: 'General Veers',
        active: true,
        itemsCanBeAttended: [
            testItemsWithId[Items.StarShipNews]._id,
            testItemsWithId[Items.DeathStarInspection]._id,
        ],
        groupes: [
            testGroupsWithId[Groupes.Empire]._id,
            testGroupsWithId[Groupes.StarShipLovers]._id,
        ],
    };

    testPeople[People.C3PO] = {
        name: 'C-3PO',
        active: true,
        itemsCanBeAttended: [testItemsWithId[Items.CleaningDuty]._id],
        groupes: [testGroupsWithId[Groupes.Alliance]._id],
    };

    testPeople[People.Solo] = {
        name: 'Han Solo',
        active: true,
        itemsCanBeAttended: [
            testItemsWithId[Items.RegularDarthVaderAttack]._id,
            testItemsWithId[Items.StarShipNews]._id,
        ],
        groupes: [testGroupsWithId[Groupes.Alliance]._id],
    };

    testPeople[People.Chewbacca] = {
        name: 'Chewbacca',
        active: true,
        itemsCanBeAttended: [
            testItemsWithId[Items.RegularDarthVaderAttack]._id,
        ],
        groupes: [testGroupsWithId[Groupes.Alliance]._id],
    };

    testPeople[People.Asoka] = {
        name: 'Asoka',
        active: true,
        itemsCanBeAttended: [
            testItemsWithId[Items.RegularDarthVaderAttack]._id,
            testItemsWithId[Items.CleaningDuty]._id,
        ],
        groupes: [testGroupsWithId[Groupes.Alliance]._id],
    };

    testPeople[People.Ackbar] = {
        name: 'Ackbar',
        active: true,
        itemsCanBeAttended: [
            testItemsWithId[Items.RegularDarthVaderAttack]._id,
        ],
        groupes: [testGroupsWithId[Groupes.Alliance]._id],
    };

    return testPeople;
};
