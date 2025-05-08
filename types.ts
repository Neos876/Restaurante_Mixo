export type ErrCallbackType = (err: { [key: string]: string }) => void

export type ReasonType = {
  id: number
  name: string
}

export type LoginParams = {
  email: string
  password: string
  rememberMe?: boolean
}

export type RegisterParams = {
  email: string
  username: string
  password: string
}

export type ClientBillDataType = {
  id: number
  name?:string
  invoice_date?: Date
  amount_total?: number
  partner_id: {
    partnerId: number
    partnerName: string
  }
}

export type UserDataType = {
  id: number
  role: string
  email: string
  fullName: string
  username: string
  password?: string
  avatar: string
}

export type PayrollFormDataType = {
    email: string
    username: string
    first: string
    second: string
    document: string
    numdocAccount: string
    account: string
    numseg: string
    telf: string
    iban: string
    firstCarer: string,
    nameCarer: string,
    documentCarer: string,
    telfCarer: string,
    numsegCarer: string,
    dateCarerDay: string,
    dateCarerMonth: string,
    dateCarerYear: string,
    secondCarer: string,
    numdocCarer: string,
    emailCarer: string,
    domicileCarer: string,
    via: string
    street: string
    block: string
    num: string
    bis: string
    flat: string
    door: string
    ladder: string
    municipality: string
    province: string
    pcode: string
    dateSocialDay: string
    dateSocialMonth: string
    dateSocialYear: string
    causeContract: string
    check: string
    hoursWeek: string
    scheduleCarried: string
    salary: string
    proratedPay: string
    temporaryService: string
    messageTemporary: string
    endDateTemporality: string
    digitalCertificate: string
    assignedPhone: string
    requiredPhone: string
  }
export type ContractFormDataType = {
    email: string
    username: string
    first: string
    second: string
    document: string
    numdocAccount: string
    account: string
    numseg: string
    telf: string
    iban: string
    firstCarer: string,
    nameCarer: string,
    documentCarer: string,
    dateCarerDay: string,
    dateCarerMonth: string,
    dateCarerYear: string,
    secondCarer: string,
    numdocCarer: string,
    digitalCertificate: string
    assignedPhone: string
    requiredPhone: string
  } 
export type FormDataEdit = {
    fullName: string | undefined
    status: string | undefined
    role: string | undefined
    country: string | undefined
    phone: string | undefined
    email: string | undefined
}

export type FormDataRestorPassword = {
  password: string | undefined
}

export type AuthValuesType = {
  loading: boolean
  logout: () => void
  user: UserDataType | null
  setLoading: (value: boolean) => void
  setUser: (value: UserDataType | null) => void
  login: (params: LoginParams, errorCallback?: ErrCallbackType) => void
  register: (params: RegisterParams, errorCallback?: ErrCallbackType) => void
}

export type ClientData = {
  id: number
  name: string
  state: boolean
  country: {
    id: number
    name: string
  }
  phone: string
  email: string
  image: string
}
export type ClientEmail = {
  email: string
}

export type UploadPayroll = {
  imageFront: boolean
  imageReverse: boolean
  imageCarerFront: boolean
  imageCarerReverse: boolean
  imageContract: boolean
  imagePayroll: boolean
}

export interface DataNumberOrder {
  number: [id:number, name:string],
}

export type UserIdRestorePassword = {
  id?: number
}

export type LinkRestorePassword = {
  msg?: string
}

export type LastManagementId = {
  id: number
}

export type PaymentMethod = {
  id: number
  url_pago: {
    Ds_Merchant_Parameters: string
    Ds_Signature: string
  }
  amount_untaxed: number
  amount_total: number
  amount_tax: number
  partner_id: {
    partnerId: number
    partnerName: string
  }
  order_name: string
  state: string
  msg: string
  payment_state?: string
  unpaid_invoice?: boolean
  fee_month?: string
  x_forma_pago?: string
  msg_unpaid?: string
}

export type PaymentMethodB2B = {
  id: number
  url_pago: {
    Ds_Merchant_Parameters: string
    Ds_Signature: string
  }
  amount_untaxed: number
  amount_total: number
  amount_tax: number
  partner_id: {
    partnerId: number
    partnerName: string
  }
  order_name: string
  state: string
  msg: string
  payment_state?: string
  unpaid_invoice?: boolean
  fee_month?: string
  x_forma_pago?: string
  msg_unpaid?: string
}

type Attachment = {
  id: number;
  name: string;
}

type AttachmentIds = Attachment[]

export type PathImage = {
  id: number
  path: string
}

export type ManagementHistoric = {
  id_ss:  number
  create_date: {
    date: string
    time: string
  }
  stage_id: {
    id: number
    name: string
  }
  employee_id: {
    id: number
    name: string
  }
  create_uid: {
    id: number
    name: string
  }
  path: string
  description: string
  body: string
  attachment_ids: []
  attachment_data: { id: number, attachment_ids: AttachmentIds }
  historic_token: string
}

export type DataPlan = {
  id: number
  plan: string
  image: string
  price: number
}
