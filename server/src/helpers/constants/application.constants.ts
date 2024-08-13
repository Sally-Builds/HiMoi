export enum ResponseMessage {
  ACCEPTED = "Accepted",
  BAD_GATEWAY = "Bad Gateway",
  BAD_REQUEST = "Bad Request",
  CONFLICT = "Conflict",
  CONTINUE = "Continue",
  CREATED = "Created",
  EXPECTATION_FAILED = "Expectation Failed",
  FAILED_DEPENDENCY = "Failed Dependency",
  FORBIDDEN = "Forbidden",
  GATEWAY_TIMEOUT = "Gateway Timeout",
  GONE = "Gone",
  HTTP_VERSION_NOT_SUPPORTED = "HTTP Version Not Supported",
  IM_A_TEAPOT = "I'm a teapot",
  INSUFFICIENT_SPACE_ON_RESOURCE = "Insufficient Space on Resource",
  INSUFFICIENT_STORAGE = "Insufficient Storage",
  INTERNAL_SERVER_ERROR = "Internal Server Error",
  LENGTH_REQUIRED = "Length Required",
  LOCKED = "Locked",
  METHOD_FAILURE = "Method Failure",
  METHOD_NOT_ALLOWED = "Method Not Allowed",
  MOVED_PERMANENTLY = "Moved Permanently",
  MOVED_TEMPORARILY = "Moved Temporarily",
  MULTI_STATUS = "Multi-Status",
  MULTIPLE_CHOICES = "Multiple Choices",
  NETWORK_AUTHENTICATION_REQUIRED = "Network Authentication Required",
  NO_CONTENT = "No Content",
  NON_AUTHORITATIVE_INFORMATION = "Non Authoritative Information",
  NOT_ACCEPTABLE = "Not Acceptable",
  NOT_FOUND = "Not Found",
  NOT_IMPLEMENTED = "Not Implemented",
  NOT_MODIFIED = "Not Modified",
  OK = "OK",
  PARTIAL_CONTENT = "Partial Content",
  PAYMENT_REQUIRED = "Payment Required",
  PERMANENT_REDIRECT = "Permanent Redirect",
  PRECONDITION_FAILED = "Precondition Failed",
  PRECONDITION_REQUIRED = "Precondition Required",
  PROCESSING = "Processing",
  EARLY_HINTS = "Early Hints",
  UPGRADE_REQUIRED = "Upgrade Required",
  PROXY_AUTHENTICATION_REQUIRED = "Proxy Authentication Required",
  REQUEST_HEADER_FIELDS_TOO_LARGE = "Request Header Fields Too Large",
  REQUEST_TIMEOUT = "Request Timeout",
  REQUEST_TOO_LONG = "Request Entity Too Large",
  REQUEST_URI_TOO_LONG = "Request-URI Too Long",
  REQUESTED_RANGE_NOT_SATISFIABLE = "Requested Range Not Satisfiable",
  RESET_CONTENT = "Reset Content",
  SEE_OTHER = "See Other",
  SERVICE_UNAVAILABLE = "Service Unavailable",
  SWITCHING_PROTOCOLS = "Switching Protocols",
  TEMPORARY_REDIRECT = "Temporary Redirect",
  TOO_MANY_REQUESTS = "Too Many Requests",
  UNAUTHORIZED = "Unauthorized",
  UNAVAILABLE_FOR_LEGAL_REASONS = "Unavailable For Legal Reasons",
  UNPROCESSABLE_ENTITY = "Unprocessable Entity",
  UNSUPPORTED_MEDIA_TYPE = "Unsupported Media Type",
  USE_PROXY = "Use Proxy",
  MISDIRECTED_REQUEST = "Misdirected Request",

  /** Custom Enum */
  WRONG_PASSWORD = 'Wrong Password',
  INVALID_EMAIL = 'Invalid Email',
  LOGIN_INCORRECT_CREDENTIALS = 'Username or Password incorrect',
  ENV_NOT_FOUND = 'Environmental variables missing',
  INSURANCE_COMPANY_NOT_FOUND = 'Insurance company not found',
  INSURANCE_SERVICE_UDC_NOT_FOUND = 'Insurance service UDC not found',
  INSURANCE_SUB_SERVICE_UDC_NOT_FOUND = 'Insurance sub service UDC not found',
}

export const TIME_FORMAT = 'MMMM Do YYYY, h a'

export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
}

export enum UserRole {
  VENDOR = 'vendor',
  CUSTOMER = 'customer',
  ADMIN = 'admin',
}

export enum ResendOTPType {
  ACCOUNT_VERIFICATION = 'account verification',
  FORGOT_PASSWORD = 'forgot password',
  'WITHDRAW_APPROVAL' = 'withdraw'
}

export const USER_TABLE = 'users'
export const WALLET_TABLE = 'wallet'
export const LIFEGUARD_TABLE = 'lifeguards'
export const SCHEDULE_TABLE = 'schedules'
export const FEATURES_TABLE = 'features'
export const TAG_ADMIN_TABLE = 'tagadmins'
export const SESSION_TABLE = 'sessions'
export const MENTORSHIP_TABLE = 'mentorships'
export const MENTORSHIP_APPLICATION_TABLE = 'mentorship_applications'
export const INTERNSHIP_TABLE = 'internships'
export const INTERNSHIP_APPLICATION_TABLE = 'internship_applications'
export const BOOKS_TABLE = 'books'
export const GENRE_CALENDAR_TABLE = 'genrecalendars'
export const BOOK_POLL_TABLE = 'bookpolls'
export const WBP_REGISTRATION_TABLE = 'wbpforms'
export const EVENTS_TABLE = 'events'
export const EVENT_AUDIENCE_TABLE = 'eventaudiences'
export const FAQ_TABLE = 'faqs'
