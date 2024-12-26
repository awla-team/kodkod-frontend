export default interface AnalysisData {
  classroomData: {
    kpi_total_activities: number;
    kpi_participation_level: number;
    kpi_alerts: number;
    kpi_alerts_level: number;
    kpi_motivation_level: number;
  };
  studentsData: StudenDataI[];
}

export interface StudenDataI {
  student_id: number;
  first_name: string;
  last_name: string;
  dailyActivities: DailyActivitiesI[];
}

export interface DailyActivitiesI {
  date: string;
  activities_completed: number;
}
