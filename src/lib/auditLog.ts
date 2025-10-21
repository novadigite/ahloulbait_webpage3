import { supabase } from '@/integrations/supabase/client';

interface AuditLogParams {
  action: string;
  tableName?: string;
  recordId?: string;
  oldData?: any;
  newData?: any;
}

export const logAudit = async (params: AuditLogParams): Promise<void> => {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      console.warn('Cannot log audit: No active session');
      return;
    }

    await supabase.functions.invoke('log-audit', {
      body: params,
      headers: {
        Authorization: `Bearer ${session.access_token}`
      }
    });
  } catch (error) {
    // Silent fail - audit logging should not block operations
    if (import.meta.env.DEV) {
      console.error('Audit log error:', error);
    }
  }
};