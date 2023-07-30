import { getRegularDarthVaderAttackTestEvents } from './src/Events/regularDarthVaderAttackTestEvents';
import { getGroups } from './src/Groups/groups';
import { mapIds } from './src/helpers';
import { getItems } from './src/Items/items';
import { getpeople } from './src/People/people';
import { getRoles } from './src/Roles/roles';

const testRolesWithoutId = getRoles();
const rolesRes = db.roles.insertMany(testRolesWithoutId);
const testRolesWithId = mapIds(rolesRes, testRolesWithoutId);

const testGroupsWithoutId = getGroups();
const groupsRes = db.groups.insertMany(testGroupsWithoutId);
const testGroupsWithId = mapIds(groupsRes, testGroupsWithoutId);

const testItemsWithoutId = getItems(testRolesWithId, testGroupsWithId);
const itemsRes = db['rotation-items'].insertMany(testItemsWithoutId);
const testItemsWithId = mapIds(itemsRes, testItemsWithoutId);

const testPeopleWithoutId = getpeople(testItemsWithId, testGroupsWithId);
const peopleRes = db.people.insertMany(testPeopleWithoutId);
const testPeopleWithId = mapIds(peopleRes, testPeopleWithoutId);

const testEvents = [
    ...getRegularDarthVaderAttackTestEvents(
        testRolesWithId,
        testPeopleWithId,
        testItemsWithId
    ),
    // ...starShipNewTestEvents,
];
const eventsRes = db['rotation-events'].insertMany(testEvents);
