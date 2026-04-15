import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { 
  Users, 
  UserSquare2, 
  CalendarCheck, 
  TrendingUp,
  Bell,
  CheckCircle2
} from 'lucide-react';
import api from '../lib/api';

export const DashboardPage: React.FC = () => {
  const [stats, setStats] = React.useState({
    students: 0,
    teachers: 0,
    attendanceToday: 0,
    notifications: []
  });

  React.useEffect(() => {
    const fetchStats = async () => {
      try {
        const [students, teachers, attendance, notifications] = await Promise.all([
          api.get('/students'),
          api.get('/teachers'),
          api.get('/attendance?date=' + new Date().toISOString().split('T')[0]),
          api.get('/notifications')
        ]);

        setStats({
          students: students.data.length,
          teachers: teachers.data.length,
          attendanceToday: attendance.data.length,
          notifications: notifications.data.slice(0, 5)
        });
      } catch (error) {
        console.error('Failed to fetch dashboard stats');
      }
    };
    fetchStats();
  }, []);

  const cards = [
    { title: 'Total Students', value: stats.students, icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
    { title: 'Total Teachers', value: stats.teachers, icon: UserSquare2, color: 'text-purple-600', bg: 'bg-purple-50' },
    { title: 'Attendance Today', value: stats.attendanceToday, icon: CalendarCheck, color: 'text-green-600', bg: 'bg-green-50' },
    { title: 'Pass Rate', value: '88%', icon: TrendingUp, color: 'text-orange-600', bg: 'bg-orange-50' },
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, i) => (
          <Card key={i} className="border-none shadow-sm overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">{card.title}</p>
                  <h3 className="text-3xl font-bold mt-1">{card.value}</h3>
                </div>
                <div className={`${card.bg} p-3 rounded-xl`}>
                  <card.icon className={card.color} size={24} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 border-none shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <CheckCircle2 className="text-green-500" size={20} />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4].map((_, i) => (
                <div key={i} className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">New student enrolled in Grade 10</p>
                    <p className="text-xs text-gray-400">2 hours ago</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Bell className="text-orange-500" size={20} />
              Announcements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {stats.notifications.length > 0 ? stats.notifications.map((n: any) => (
                <div key={n._id} className="space-y-1">
                  <h4 className="text-sm font-semibold">{n.title}</h4>
                  <p className="text-xs text-gray-500 line-clamp-2">{n.message}</p>
                </div>
              )) : (
                <p className="text-sm text-gray-400 text-center py-8">No new announcements</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
