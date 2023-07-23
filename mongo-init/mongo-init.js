const mapIds = (res, array) => {
    return array.map((arrayItem, index) => {
        return {
            ...arrayItem,
            _id: res.insertedIds[index],
        };
    });
};

const date = new Date();

// Roles
const Roles = {
    MainAssasin: 0,
    SupportAssasin: 1,
    Presenter: 2,
    Cleaner: 3,
    Inspector: 4,
};
const testRoles = [];
testRoles[Roles.MainAssasin] = {
    name: 'Main Assasin',
    description: 'Leads the mission',
    icon: 'faUserNinja',
    canHaveMultipleParticipants: false,
};
testRoles[Roles.SupportAssasin] = {
    name: 'Support Assasin',
    description: 'Supports the mission',
    icon: 'faUserNinja',
    canHaveMultipleParticipants: true,
};
testRoles[Roles.Presenter] = {
    name: 'Presenter',
    description: 'Talks about stuff',
    icon: 'faMicrophone',
    canHaveMultipleParticipants: false,
};
testRoles[Roles.Cleaner] = {
    name: 'Cleaner',
    description: 'Cleans the mess',
    icon: 'faBroom',
    canHaveMultipleParticipants: true,
};
testRoles[Roles.Inspector] = {
    name: 'Inspector',
    description: 'Checks the stuff',
    icon: 'faClipboardCheck',
    canHaveMultipleParticipants: false,
};

const rolesRes = db.roles.insertMany(testRoles);
testRoles = mapIds(rolesRes, testRoles);

// Groupes
const Groupes = {
    Alliance: 0,
    StarShipLovers: 1,
    Empire: 2,
};
const testGroups = [];
testGroups[Groupes.Alliance] = {
    name: 'Alliance',
    description:
        'Also includes Jedis. There is no ignorance, there is knowledge.',
};
testGroups[Groupes.StarShipLovers] = {
    name: 'Starship lovers',
    description: 'Everyone who loves starships is welcomed!',
};
testGroups[Groupes.Empire] = {
    name: 'Empire',
    description: 'LONG LIVE THE EMPIRE!"',
};

const groupsRes = db.groups.insertMany(testGroups);
testGroups = mapIds(groupsRes, testGroups);

// Items
const Items = {
    // longer then one day, has fixed length of 2 days, doesnt happen regularly
    RegularDarthVaderAttack: 0,
    // takes only one day
    StarShipNews: 1,
    // longer then one day, has fixed length of 7 days, happens regularly
    CleaningDuty: 2,
    // longer then one day, doesnt have fixed length, doesnt happen regularly
    DeathStarInspection: 3,
};
const testItems = [];
testItems[Items.RegularDarthVaderAttack] = {
    name: 'Regular alliance attack on Darth Vader',
    description: 'Regular attack to keep him on his toes',
    longDescription:
        'Happens in the middle of the night, takes two days, irregularly',
    roles: [
        testRoles[Roles.MainAssasin]._id,
        testRoles[Roles.SupportAssasin]._id,
    ],
    isLongerThenOneDay: true,
    usualLength: 2,
    hasAutomaticStartDate: false,
    groupes: [testGroups[Groupes.Alliance]._id],
};
testItems[Items.StarShipNews] = {
    name: 'Starship news',
    description:
        'Everyone from the galaxy is welcomed! One person gives a presentation about starships',
    longDescription: 'Happens on planet EX-42, takes only few hours',
    roles: [testRoles[Roles.Presenter]._id],
    isLongerThenOneDay: false,
    groupes: [testGroups[Groupes.StarShipLovers]._id],
};
testItems[Items.CleaningDuty] = {
    name: 'Cleaning duty',
    description: 'Cleans the Millennium Falcon',
    longDescription:
        'For one week the crew cleans kitchen, bathroom, living room, nuclear reactor, etc.',
    roles: [testRoles[Roles.Cleaner]._id],
    isLongerThenOneDay: true,
    hasAutomaticStartDate: true,
    usualLength: 7,
    groupes: [testGroups[Groupes.StarShipLovers]._id],
};
testItems[Items.CleaningDuty] = {
    name: 'Falcon cleaning duty',
    description: 'Cleans the Millennium Falcon',
    longDescription:
        'For one week clean kitchen, bathroom, living room, nuclear reactor, etc.',
    roles: [testRoles[Roles.Cleaner]._id],
    isLongerThenOneDay: true,
    hasAutomaticStartDate: true,
    usualLength: 7,
    groupes: [testGroups[Groupes.Alliance]._id],
};
testItems[Items.DeathStarInspection] = {
    name: 'Death Start Inspection',
    description: 'When the red LED blinks, check the Death Star',
    longDescription:
        'Take as much time as you need, but make sure everything is working properly',
    roles: [testRoles[Roles.Inspector]._id],
    isLongerThenOneDay: true,
    hasAutomaticStartDate: false,
    groupes: [testGroups[Groupes.Empire]._id],
};

const itemsRes = db['rotation-items'].insertMany(testItems);
testItems = mapIds(itemsRes, testItems);

// People
const People = {
    ObiWan: 0,
    Anakin: 1,
    Mace: 2,
    Palpatine: 3,
    Veers: 4,
    C3PO: 5,
    Solo: 6,
    Chewbacca: 7,
};
const testPeople = [];

testPeople[People.ObiWan] = {
    name: 'Obi-Wan Kenobi',
    active: true,
    itemsCanBeAttended: [
        testItems[Items.RegularDarthVaderAttack]._id,
        testItems[Items.StarShipNews]._id,
        testItems[Items.CleaningDuty]._id,
    ],
    groupes: [
        testGroups[Groupes.Alliance]._id,
        testGroups[Groupes.StarShipLovers]._id,
    ],
};

testPeople[People.Anakin] = {
    name: 'Anakin Skywalker',
    active: false,
    itemsCanBeAttended: [
        testItems[Items.RegularDarthVaderAttack]._id,
        testItems[Items.StarShipNews]._id,
        testItems[Items.CleaningDuty]._id,
    ],
    groupes: [
        testGroups[Groupes.Alliance]._id,
        testGroups[Groupes.StarShipLovers]._id,
    ],
};

testPeople[People.Mace] = {
    name: 'Mace Windu',
    active: true,
    itemsCanBeAttended: [
        testItems[Items.RegularDarthVaderAttack]._id,
        testItems[Items.StarShipNews]._id,
        testItems[Items.CleaningDuty]._id,
    ],
    groupes: [
        testGroups[Groupes.Alliance]._id,
        testGroups[Groupes.StarShipLovers]._id,
    ],
};

testPeople[People.Palpatine] = {
    name: 'Palpatine',
    active: true,
    itemsCanBeAttended: [
        testItems[Items.StarShipNews]._id,
        testItems[Items.DeathStarInspection]._id,
    ],
    groupes: [
        testGroups[Groupes.Empire]._id,
        testGroups[Groupes.StarShipLovers]._id,
    ],
};

testPeople[People.Veers] = {
    name: 'General Veers',
    active: true,
    itemsCanBeAttended: [
        testItems[Items.StarShipNews]._id,
        testItems[Items.DeathStarInspection]._id,
    ],
    groupes: [
        testGroups[Groupes.Empire]._id,
        testGroups[Groupes.StarShipLovers]._id,
    ],
};

testPeople[People.C3PO] = {
    name: 'C-3PO',
    active: true,
    itemsCanBeAttended: [testItems[Items.CleaningDuty]._id],
    groupes: [testGroups[Groupes.Alliance]._id],
};

testPeople[People.Solo] = {
    name: 'Han Solo',
    active: true,
    itemsCanBeAttended: [
        testItems[Items.RegularDarthVaderAttack]._id,
        testItems[Items.StarShipNews]._id,
    ],
    groupes: [testGroups[Groupes.Alliance]._id],
};

testPeople[People.Chewbacca] = {
    name: 'Chewbacca',
    active: true,
    itemsCanBeAttended: [testItems[Items.RegularDarthVaderAttack]._id],
    groupes: [testGroups[Groupes.Alliance]._id],
};

const peopleRes = db.people.insertMany(testPeople);
testPeople = mapIds(peopleRes, testPeople);

// Events
const regularDarthVaderAttackTestEvents = [
    {
        item: testItems[Items.RegularDarthVaderAttack]._id,
        startDate: new Date('2022-01-01'),
        endDate: new Date('2022-01-03'),
        participants: [
            {
                role: testRoles[Roles.MainAssasin]._id,
                person: testPeople[People.Mace]._id,
            },
            {
                role: testRoles[Roles.SupportAssasin]._id,
                person: testPeople[People.ObiWan]._id,
            },
            {
                role: testRoles[Roles.SupportAssasin]._id,
                person: testPeople[People.Chewbacca]._id,
            },
        ],
    },
    {
        item: testItems[Items.RegularDarthVaderAttack]._id,
        startDate: new Date('2022-02-02'),
        endDate: new Date('2022-02-04'),
        participants: [
            {
                role: testRoles[Roles.MainAssasin]._id,
                person: testPeople[People.Solo]._id,
            },
            {
                role: testRoles[Roles.SupportAssasin]._id,
                person: testPeople[People.Chewbacca]._id,
            },
            {
                role: testRoles[Roles.SupportAssasin]._id,
                person: testPeople[People.ObiWan]._id,
            },
        ],
    },
    {
        item: testItems[Items.RegularDarthVaderAttack]._id,
        startDate: new Date('2022-04-06'),
        endDate: new Date('2022-04-08'),
        participants: [
            {
                role: testRoles[Roles.MainAssasin]._id,
                person: testPeople[People.Chewbacca]._id,
            },
            {
                role: testRoles[Roles.SupportAssasin]._id,
                person: testPeople[People.Solo]._id,
            },
        ],
    },
    {
        item: testItems[Items.RegularDarthVaderAttack]._id,
        startDate: new Date('2022-06-08'),
        endDate: new Date('2022-06-10'),
        participants: [
            {
                role: testRoles[Roles.MainAssasin]._id,
                person: testPeople[People.Solo]._id,
            },
            {
                role: testRoles[Roles.SupportAssasin]._id,
                person: testPeople[People.Mace]._id,
            },
            {
                role: testRoles[Roles.SupportAssasin]._id,
                person: testPeople[People.ObiWan]._id,
            },
            {
                role: testRoles[Roles.SupportAssasin]._id,
                person: testPeople[People.Chewbacca]._id,
            },
        ],
    },
    {
        item: testItems[Items.RegularDarthVaderAttack]._id,
        startDate: new Date('2022-06-11'),
        endDate: new Date('2022-06-13'),
        participants: [
            {
                role: testRoles[Roles.MainAssasin]._id,
                person: testPeople[People.Chewbacca]._id,
            },
            {
                role: testRoles[Roles.SupportAssasin]._id,
                person: testPeople[People.Mace]._id,
            },
        ],
    },
    {
        item: testItems[Items.RegularDarthVaderAttack]._id,
        startDate: new Date('2022-08-20'),
        endDate: new Date('2022-08-22'),
        participants: [
            {
                role: testRoles[Roles.MainAssasin]._id,
                person: testPeople[People.Mace]._id,
            },
            {
                role: testRoles[Roles.SupportAssasin]._id,
                person: testPeople[People.Solo]._id,
            },
        ],
    },
    {
        item: testItems[Items.RegularDarthVaderAttack]._id,
        startDate: new Date('2022-08-25'),
        endDate: new Date('2022-08-27'),
        participants: [
            {
                role: testRoles[Roles.MainAssasin]._id,
                person: testPeople[People.ObiWan]._id,
            },
            {
                role: testRoles[Roles.SupportAssasin]._id,
                person: testPeople[People.Chewbacca]._id,
            },
        ],
    },
    {
        item: testItems[Items.RegularDarthVaderAttack]._id,
        startDate: new Date('2022-07-10'),
        endDate: new Date('2022-07-12'),
        participants: [
            {
                role: testRoles[Roles.MainAssasin]._id,
                person: testPeople[People.Mace]._id,
            },
            {
                role: testRoles[Roles.SupportAssasin]._id,
                person: testPeople[People.ObiWan]._id,
            },
        ],
    },
    {
        // one event running
        item: testItems[Items.RegularDarthVaderAttack]._id,
        startDate: date.getDate(),
        endDate: date.setDate(date.getDate() + 1),
        participants: [
            {
                role: testRoles[Roles.MainAssasin]._id,
                person: testPeople[People.Mace]._id,
            },
            {
                role: testRoles[Roles.SupportAssasin]._id,
                person: testPeople[People.ObiWan]._id,
            },
        ],
    },
    // some events in the future
    {
        item: testItems[Items.RegularDarthVaderAttack]._id,
        startDate: date.setDate(date.getDate() + 10),
        endDate: date.setDate(date.getDate() + 12),
        participants: [
            {
                role: testRoles[Roles.MainAssasin]._id,
                person: testPeople[People.ObiWan]._id,
            },
            {
                role: testRoles[Roles.SupportAssasin]._id,
                person: testPeople[People.Chewbacca]._id,
            },
        ],
    },
];

const starShipNewTestEvents = [
    {
        item: testItems[Items.StarShipNews]._id,
        startDate: new Date('2022-01-01'),
        participants: [
            {
                role: testRoles[Roles.Presenter]._id,
                person: testPeople[People.ObiWan]._id,
            },
        ],
        eventNote: 'Presentation about Jedi starfighter.',
    },
    {
        item: testItems[Items.StarShipNews]._id,
        startDate: new Date('2022-01-02'),
        participants: [
            {
                role: testRoles[Roles.Presenter]._id,
                person: testPeople[People.Palpatine]._id,
            },
        ],
        eventNote:
            "Death Star Disco: Get Groovy with the Empire's Ultimate Weapon!",
    },
    {
        item: testItems[Items.StarShipNews]._id,
        startDate: date.setDate(date.getDate() + 10),
        participants: [
            {
                role: testRoles[Roles.Presenter]._id,
                person: testPeople[People.Solo]._id,
            },
        ],
        eventNote:
            'Millennium Falcon: The Coolest Ride in the Galaxy - Rebel Style!',
    },
    {
        item: testItems[Items.StarShipNews]._id,
        startDate: date.setDate(date.getDate() + 15),
        participants: [
            {
                role: testRoles[Roles.Presenter]._id,
                person: testPeople[People.Veers]._id,
            },
        ],
        eventNote:
            "AT-AT: The Empire's Mighty Behemoth - Unveiling the Galactic Ground Force!",
    },
];
const testEvents = [
    ...regularDarthVaderAttackTestEvents,
    ...starShipNewTestEvents,
];
const eventsRes = db['rotation-events'].insertMany(testEvents);
