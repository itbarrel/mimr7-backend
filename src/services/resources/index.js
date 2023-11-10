const ResourceService = require('./resource')
const AccountService = require('./account')
const RoleService = require('./role')
const UserService = require('./user')
const OrganizationService = require('./organization')
const ContentService = require('./content')
const ContentLibraryService = require('./contentLibrary')
const HighlightService = require('./highlight')
const HighlightLibraryService = require('./highlightLibrary')
const PlayerService = require('./player')
const LocationService = require('./location')
const MessageService = require('./message')
const KlassService = require('./klass')
const DynamicFormService = require('./dynamicForm')
const ContentplanTemplateService = require('./contantPlanTemplate')
const StudentService = require('./student')
const KlassScheduleService = require('./klassSchedule')
const MessageScheduleService = require('./messageSchedule')
const MessageScheduleAnswerService = require('./messageScheduleAnswer')
const GptHighlightService = require('./gptHighlight')
const GptMessageService = require('./gptMessage')

module.exports = {
    ResourceService,
    AccountService,
    UserService,
    RoleService,
    OrganizationService,
    ContentService,
    ContentLibraryService,
    HighlightService,
    HighlightLibraryService,
    PlayerService,
    LocationService,
    MessageService,
    KlassService,
    DynamicFormService,
    ContentplanTemplateService,
    StudentService,
    KlassScheduleService,
    MessageScheduleService,
    MessageScheduleAnswerService,
    GptHighlightService,
    GptMessageService,
}
