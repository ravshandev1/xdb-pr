export type BaseFormValues = {
  phone: string;
  password: string;
};

export type UpdateUserFormValues = BaseFormValues & {
  name: string;
};

export type CreateUserFormValues = UpdateUserFormValues & {
  confirm_password: string;
};

export type SettingsFormValues = {
  phone: string;
  password: string;
  new_password: string;
};

export interface IUser {
  id: string;
  phone: string;
  password: string;
  created_at: Date;
  name: string;
  superuser: boolean;
  image?: string;
}

export interface IApplication {
  count: number;
  next: string;
  previous: string;
  results: IApplicationData[];
}

export interface IApplicationData {
  id: number;
  address: string;
  date: string;
  amount: number;
  status: string;
  code: number;
  count: number;
  created_at: Date;
  subject_name: string;
  stir: number;
  diff_count: string | number;
  different: string | number;
}

export const IStatus = {
  Yuborilmagan: "Yuborilmagan",
  Muvaffaqiyatli: "Muvaffaqiyatli",
  Xatolik: "Xatolik",
  Takrorlangan: "Takrorlangan",
};

export type RoleType = "superadmin" | "user" | string;
