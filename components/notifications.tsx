import { useEffect, useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useUser } from '@/hooks/useUser';

interface Notification {
  id: string;
  message: string;
  created_at: string;
  read: boolean;
}

export function Notifications() {
  const { role } = useUser();
  const [notifications, setNotifications] = useState<Notification[]>([])
  const supabase = createClientComponentClient();

  useEffect(() => {
    if (role === 'contributor') {
      fetchNotifications()

      const channel = supabase.channel('public:notifications')
        .on('postgres_changes', { 
          event: 'INSERT', 
          schema: 'public', 
          table: 'notifications' 
        }, (payload) => {
          console.log('New notification received:', payload.new);
          setNotifications(prevNotifications => [payload.new as Notification, ...prevNotifications])
        })
        .subscribe()

      return () => {
        supabase.removeChannel(channel)
      }
    }
  }, [role, supabase])

  const fetchNotifications = async () => {
    const { data, error } = await supabase
      .from('notifications')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(5)

    if (error) {
      console.error('Error fetching notifications:', error)
    } else {
      console.log('Fetched notifications:', data);
      setNotifications(data as Notification[])
    }
  }

  const markAsRead = async (id: string) => {
    const { error } = await supabase
      .from('notifications')
      .update({ read: true })
      .eq('id', id)

    if (error) {
      console.error('Error marking notification as read:', error)
    } else {
      setNotifications(prevNotifications =>
        prevNotifications.map(notif =>
          notif.id === id ? { ...notif, read: true } : notif
        )
      )
    }
  }

  console.log('Notifications - User role:', role);

  if (role !== 'contributor') {
    console.log('Notifications - Not rendering for non-contributor');
    return null;
  }

  return (
    <div className="max-h-96 overflow-y-auto">
      <h2 className="text-lg font-semibold mb-2 px-4 py-2">Notifications</h2>
      {notifications.length === 0 ? (
        <p className="text-gray-500 px-4 py-2">No new notifications</p>
      ) : (
        notifications.map(notification => (
          <div 
            key={notification.id} 
            className={`px-4 py-2 hover:bg-gray-100 cursor-pointer ${notification.read ? 'opacity-50' : ''}`}
            onClick={() => markAsRead(notification.id)}
          >
            <p className="text-sm">{notification.message}</p>
            <small className="text-gray-500">{new Date(notification.created_at).toLocaleString()}</small>
          </div>
        ))
      )}
    </div>
  )
}