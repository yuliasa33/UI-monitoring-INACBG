export interface EducationModel {
  id_education: number;
  education: string;
  deskripsi: string;
}

export type EducationInsert = Partial<EducationModel>