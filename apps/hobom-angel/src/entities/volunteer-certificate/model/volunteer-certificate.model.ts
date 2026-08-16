/** One participation line on a certificate. */
export interface CertificateItem {
  eventTitle: string;
  shelterName: string;
  startAt: string;
  endAt: string;
  minutes: number;
}

/** A volunteer's activity certificate (봉사활동 확인서), issued from completed
 *  participations. `certificateNo` is the public verification handle. */
export interface VolunteerCertificate {
  certificateNo: string;
  volunteerNickname: string;
  issuedAt: string;
  totalCount: number;
  totalMinutes: number;
  totalHours: number;
  items: CertificateItem[];
}
