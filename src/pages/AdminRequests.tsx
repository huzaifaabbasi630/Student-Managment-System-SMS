import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '../components/ui/table';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Check, X, UserCheck } from 'lucide-react';
import api from '../lib/api';
import { toast } from 'sonner';

export const AdminRequests: React.FC = () => {
  const [pendingUsers, setPendingUsers] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);

  const fetchPendingUsers = async () => {
    try {
      const res = await api.get('/admin/pending-users');
      setPendingUsers(res.data);
    } catch (error) {
      toast.error('Failed to fetch pending requests');
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchPendingUsers();
  }, []);

  const handleAction = async (userId: string, action: 'approve' | 'reject') => {
    try {
      await api.post('/admin/approve-user', { userId, action });
      toast.success(action === 'approve' ? 'User approved' : 'Request rejected');
      fetchPendingUsers();
    } catch (error) {
      toast.error('Action failed');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <UserCheck className="text-primary" size={24} />
        <h2 className="text-xl font-bold">Pending Approval Requests</h2>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Requested At</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow><TableCell colSpan={5} className="text-center py-8">Loading...</TableCell></TableRow>
            ) : pendingUsers.length === 0 ? (
              <TableRow><TableCell colSpan={5} className="text-center py-8">No pending requests</TableCell></TableRow>
            ) : pendingUsers.map((user) => (
              <TableRow key={user._id}>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Badge variant="outline" className="capitalize">{user.role}</Badge>
                </TableCell>
                <TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
                <TableCell className="text-right space-x-2">
                  <Button 
                    size="sm" 
                    className="bg-green-600 hover:bg-green-700 text-white"
                    onClick={() => handleAction(user._id, 'approve')}
                  >
                    <Check size={16} className="mr-1" /> Approve
                  </Button>
                  <Button 
                    size="sm" 
                    variant="destructive"
                    onClick={() => handleAction(user._id, 'reject')}
                  >
                    <X size={16} className="mr-1" /> Reject
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
