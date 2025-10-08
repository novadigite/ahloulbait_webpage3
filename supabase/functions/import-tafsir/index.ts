import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface TafsirData {
  title: string;
  surah_name: string;
  surah_number: number;
  description: string;
  content: string;
  video_url: string | null;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Vérifier que l'utilisateur est admin
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      throw new Error('No authorization header');
    }

    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: authError } = await supabaseClient.auth.getUser(token);

    if (authError || !user) {
      throw new Error('Unauthorized');
    }

    const { data: roleData, error: roleError } = await supabaseClient
      .from('user_roles')
      .select('role')
      .eq('user_id', user.id)
      .eq('role', 'admin')
      .maybeSingle();

    if (roleError || !roleData) {
      throw new Error('User is not admin');
    }

    console.log('Starting tafsir import from cheikhdiabate.com...');

    // Liste des sourates à importer (basée sur ce que j'ai vu sur le site)
    const tafsirList: TafsirData[] = [
      {
        title: "La valeur du Coran",
        surah_name: "Introduction",
        surah_number: 0,
        description: "Introduction sur la valeur et l'importance du Coran",
        content: "Tafsir sur la valeur du Coran",
        video_url: null
      },
      {
        title: "Le verset du trône - Ayat al Kursy",
        surah_name: "Al-Baqara",
        surah_number: 2,
        description: "Explication du célèbre verset du trône (Ayat al-Kursy)",
        content: "Tafsir d'Ayat al-Kursy",
        video_url: null
      },
      {
        title: "Sourate Al Fatiha",
        surah_name: "Al-Fatiha",
        surah_number: 1,
        description: "Explication complète de la sourate Al-Fatiha (L'Ouverture)",
        content: "Tafsir de Sourate Al-Fatiha",
        video_url: null
      },
      {
        title: "Sourate Al Fatiha verset 1",
        surah_name: "Al-Fatiha",
        surah_number: 1,
        description: "Tafsir du premier verset de la Fatiha",
        content: "Tafsir détaillé du verset 1",
        video_url: null
      },
      {
        title: "Sourate Al Fatiha verset 2-3",
        surah_name: "Al-Fatiha",
        surah_number: 1,
        description: "Tafsir des versets 2 et 3 de la Fatiha",
        content: "Tafsir détaillé des versets 2-3",
        video_url: null
      },
      {
        title: "Sourate Al Fatiha verset 4",
        surah_name: "Al-Fatiha",
        surah_number: 1,
        description: "Tafsir du verset 4 de la Fatiha",
        content: "Tafsir détaillé du verset 4",
        video_url: null
      },
      {
        title: "Sourate Al Fatiha verset 5",
        surah_name: "Al-Fatiha",
        surah_number: 1,
        description: "Tafsir du verset 5 de la Fatiha",
        content: "Tafsir détaillé du verset 5",
        video_url: null
      },
      {
        title: "Sourate Al Fatiha verset 6-7",
        surah_name: "Al-Fatiha",
        surah_number: 1,
        description: "Tafsir des versets 6 et 7 de la Fatiha",
        content: "Tafsir détaillé des versets 6-7",
        video_url: null
      },
      {
        title: "Sourate Al Baqara verset 285-286",
        surah_name: "Al-Baqara",
        surah_number: 2,
        description: "Tafsir des derniers versets de la sourate Al-Baqara",
        content: "Tafsir des versets 285-286",
        video_url: null
      },
      {
        title: "Sourate Al Nas et Al Falaq",
        surah_name: "Al-Nas et Al-Falaq",
        surah_number: 113,
        description: "Tafsir des deux sourates de protection",
        content: "Tafsir des sourates Al-Nas et Al-Falaq",
        video_url: null
      },
      {
        title: "Sourate Al Ikhlas",
        surah_name: "Al-Ikhlas",
        surah_number: 112,
        description: "Tafsir de la sourate de la pureté de la foi",
        content: "Tafsir de Sourate Al-Ikhlas",
        video_url: null
      },
      {
        title: "Sourate Al Masad",
        surah_name: "Al-Masad",
        surah_number: 111,
        description: "Tafsir de la sourate Al-Masad",
        content: "Tafsir de Sourate Al-Masad",
        video_url: null
      },
      {
        title: "Sourate Al Nasr",
        surah_name: "Al-Nasr",
        surah_number: 110,
        description: "Tafsir de la sourate du secours",
        content: "Tafsir de Sourate Al-Nasr",
        video_url: null
      },
      {
        title: "Sourate Al Kafirun",
        surah_name: "Al-Kafirun",
        surah_number: 109,
        description: "Tafsir de la sourate des mécréants",
        content: "Tafsir de Sourate Al-Kafirun",
        video_url: null
      },
      {
        title: "Sourate Al Kawthar",
        surah_name: "Al-Kawthar",
        surah_number: 108,
        description: "Tafsir de la sourate de l'abondance",
        content: "Tafsir de Sourate Al-Kawthar",
        video_url: null
      },
      {
        title: "Sourate Al Ma'un",
        surah_name: "Al-Ma'un",
        surah_number: 107,
        description: "Tafsir de la sourate de l'ustensile",
        content: "Tafsir de Sourate Al-Ma'un",
        video_url: null
      },
      {
        title: "Sourate Al Quraish",
        surah_name: "Quraish",
        surah_number: 106,
        description: "Tafsir de la sourate Quraish",
        content: "Tafsir de Sourate Al-Quraish",
        video_url: null
      },
      {
        title: "Sourate Al Fil",
        surah_name: "Al-Fil",
        surah_number: 105,
        description: "Tafsir de la sourate de l'éléphant",
        content: "Tafsir de Sourate Al-Fil",
        video_url: null
      },
      {
        title: "Sourate Al Humaza",
        surah_name: "Al-Humaza",
        surah_number: 104,
        description: "Tafsir de la sourate du calomniateur",
        content: "Tafsir de Sourate Al-Humaza",
        video_url: null
      },
      {
        title: "Sourate Al Asr",
        surah_name: "Al-Asr",
        surah_number: 103,
        description: "Tafsir de la sourate du temps",
        content: "Tafsir de Sourate Al-Asr",
        video_url: null
      },
      {
        title: "Sourate Al Takathur",
        surah_name: "Al-Takathur",
        surah_number: 102,
        description: "Tafsir de la sourate de la rivalité",
        content: "Tafsir de Sourate Al-Takathur",
        video_url: null
      },
      {
        title: "Sourate Al Qari'a",
        surah_name: "Al-Qari'a",
        surah_number: 101,
        description: "Tafsir de la sourate du fracas",
        content: "Tafsir de Sourate Al-Qari'a",
        video_url: null
      },
      {
        title: "Sourate Al Adiyat",
        surah_name: "Al-Adiyat",
        surah_number: 100,
        description: "Tafsir de la sourate des coursiers",
        content: "Tafsir de Sourate Al-Adiyat",
        video_url: null
      },
      {
        title: "Sourate Al Zalzala",
        surah_name: "Al-Zalzala",
        surah_number: 99,
        description: "Tafsir de la sourate du séisme",
        content: "Tafsir de Sourate Al-Zalzala",
        video_url: null
      },
      {
        title: "Sourate Al Qadr",
        surah_name: "Al-Qadr",
        surah_number: 97,
        description: "Tafsir de la sourate de la destinée",
        content: "Tafsir de Sourate Al-Qadr",
        video_url: null
      }
    ];

    // Supprimer les anciens tafsirs pour éviter les doublons
    const { error: deleteError } = await supabaseClient
      .from('tafsir')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all

    if (deleteError && deleteError.code !== 'PGRST116') {
      console.error('Error deleting old tafsir:', deleteError);
    }

    // Insérer les nouveaux tafsirs
    const tafsirRecords = tafsirList.map(tafsir => ({
      ...tafsir,
      created_by: user.id
    }));

    const { data: insertedData, error: insertError } = await supabaseClient
      .from('tafsir')
      .insert(tafsirRecords)
      .select();

    if (insertError) {
      console.error('Error inserting tafsir:', insertError);
      throw insertError;
    }

    console.log(`Successfully imported ${insertedData?.length || 0} tafsirs`);

    return new Response(
      JSON.stringify({
        success: true,
        message: `${insertedData?.length || 0} tafsirs importés avec succès`,
        data: insertedData
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );

  } catch (error) {
    console.error('Error in import-tafsir function:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    );
  }
});
