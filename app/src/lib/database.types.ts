export type SubmissionStatus = 'new' | 'contacted' | 'archived';
export type StoryStatus = 'pending' | 'published' | 'declined';

export interface Submission {
  id: string;
  created_at: string;
  name: string;
  email: string;
  brings: string | null;
  message: string | null;
  source_page: string | null;
  status: SubmissionStatus;
}

export type SubmissionInsert = Pick<Submission, 'name' | 'email'> &
  Partial<Pick<Submission, 'brings' | 'message' | 'source_page'>>;

export interface Story {
  id: string;
  created_at: string;
  door: string | null;
  body: string;
  format: string[];
  arc_stage: string | null;
  credit_name: string | null;
  email: string | null;
  consent: boolean;
  attachment_url: string | null;
  source_page: string | null;
  status: StoryStatus;
}

export type StoryInsert = Pick<Story, 'body' | 'consent'> &
  Partial<
    Pick<
      Story,
      'door' | 'format' | 'arc_stage' | 'credit_name' | 'email' | 'attachment_url' | 'source_page'
    >
  >;

export interface Workshop {
  id: string;
  created_at: string;
  slug: string;
  title: string;
  active: boolean;
  sort_order: number;
}

export type WorkshopUpsert = Partial<Pick<Workshop, 'id'>> &
  Pick<Workshop, 'slug' | 'title'> &
  Partial<Pick<Workshop, 'active' | 'sort_order'>>;

export type WorkshopRegistrationStatus = 'new' | 'contacted' | 'archived';

export interface WorkshopRegistration {
  id: string;
  created_at: string;
  workshop_id: string | null;
  workshop_slug: string | null;
  name: string;
  email: string;
  org: string | null;
  message: string | null;
  source_page: string | null;
  status: WorkshopRegistrationStatus;
}

export type WorkshopRegistrationInsert = Pick<WorkshopRegistration, 'name' | 'email'> &
  Partial<
    Pick<WorkshopRegistration, 'workshop_id' | 'workshop_slug' | 'org' | 'message' | 'source_page'>
  >;
