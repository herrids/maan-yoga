import { supabase } from '../config/supabaseConfig';

/**
 * Lädt alle Routinen für einen bestimmten Benutzer
 * @param {string} userEmail - E-Mail-Adresse des Benutzers
 * @returns {Promise<Array>} Array von Routinen
 */
export const getUserRoutines = async (userEmail) => {
  try {
    const { data, error } = await supabase
      .from('routines')
      .select('*')
      .eq('user_email', userEmail);

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Fehler beim Laden der Routinen:', error.message);
    throw error;
  }
};

/**
 * Lädt eine spezifische Routine anhand ihrer ID
 * @param {string} routineId - ID der Routine
 * @returns {Promise<Object>} Routine-Objekt
 */
export const getRoutine = async (routineId) => {
  try {
    const { data: routineData, error: routineError } = await supabase
      .from('routines')
      .select('*')
      .eq('id', routineId)
      .single();

    if (routineError) {
      throw routineError;
    }

    const { data: posesData, error: posesError } = await supabase
      .from('routine_poses')
      .select('*')
      .eq('routine_id', routineId)
      .order('position');

    if (posesError) {
      throw posesError;
    }

    return {
      ...routineData,
      poses: posesData
    };
  } catch (error) {
    console.error('Fehler beim Laden der Routine:', error.message);
    throw error;
  }
};

/**
 * Saves or updates a routine
 * @param {Object} routine - Routine object to save
 * @returns {Promise<Object>} Saved routine
 */
export const saveRoutine = async (data) => {
  try {
    const { poses, ...routine } = data;

    
    if (routine.id) {
      // Update routine
      const { data: routineData, error: routineError } = await supabase
        .from('routines')
        .update(routine)
        .eq('id', routine.id)
        .select()
        .single();

      if (routineError) {
        throw routineError;
      }

      // Delete existing poses
      const { error: deleteError } = await supabase
        .from('routine_poses')
        .delete()
        .eq('routine_id', routine.id);

      if (deleteError) {
        throw deleteError;
      }
      console.log(poses)
      // Insert new poses
      const posesWithRoutineId = poses.map((pose, index) => ({
        pose_id: pose.pose_id,
        breath: pose.breath,
        equipment: pose.equipment,
        routine_id: routineData.id,
        position: index
      }));

      const { error: posesError } = await supabase
        .from('routine_poses')
        .insert(posesWithRoutineId);

      if (posesError) {
        throw posesError;
      }

      return routineData.id;

    } else {
      // Insert new routine
      console.log(routine)
      const { data: routineData, error: routineError } = await supabase
        .from('routines')
        .insert(routine)
        .select()
        .single();

      if (routineError) {
        throw routineError;
      }

      // Insert poses
      const posesWithRoutineId = poses.map((pose, index) => ({
        ...pose,
        routine_id: routineData.id,
        position: index
      }));

      const { error: posesError } = await supabase
        .from('routine_poses')
        .insert(posesWithRoutineId);

      if (posesError) {
        throw posesError;
      }

      return routineData.id;
    }
  } catch (error) {
    console.error('Fehler beim Speichern der Routine:', error.message);
    throw error;
  }
}; 