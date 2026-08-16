export interface RawCertificateItem {
  eventTitle: string;
  shelterName: string;
  startAt: string;
  endAt: string;
  minutes: number;
}

export interface RawVolunteerCertificate {
  certificateNo: string;
  volunteerNickname: string;
  issuedAt: string;
  totalCount: number;
  totalMinutes: number;
  totalHours: number;
  items: RawCertificateItem[];
}
