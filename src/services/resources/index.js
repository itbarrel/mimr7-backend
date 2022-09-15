const ResourceService = require('./resource')
const AccountService = require('./account')
const RoleService = require('./role')
const UserService = require('./user')
const OrganizationService = require('./organization')
const CollectionService = require('./collection')
const CollectionLibraryService = require('./collectionLibrary')
const HighlightService = require('./highlight')
const HighlightLibraryService = require('./highlightLibrary')

module.exports = {
    ResourceService,
    AccountService,
    UserService,
    RoleService,
    OrganizationService,
    CollectionService,
    CollectionLibraryService,
    HighlightService,
    HighlightLibraryService,
}
