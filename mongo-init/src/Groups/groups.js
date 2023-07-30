export const Groupes = {
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

export const getGroups = () => {
    return testGroups;
};
