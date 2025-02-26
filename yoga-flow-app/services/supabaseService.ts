import { supabase } from '../config/supabaseConfig';
import { YogaFlow } from '@/types';

// Define TypeScript interfaces for our data structures
export interface Pose {
  id: number;
  name_english: string;
  name_german: string;
  name_sanskrit: string;
  [key: string]: any;
}

export interface RoutinePose {
  id?: number;
  pose_id: number;
  routine_id: number;
  position: number;
  breath?: string;
  equipment?: string;
  type?: string;
  text?: string;
  poses?: Pose;
  name_english?: string;
  name_german?: string;
  name_sanskrit?: string;
}

export interface Routine {
  id?: number;
  name: string;
  description?: string;
  user_email: string;
  created_at?: string;
  updated_at?: string;
  poses?: RoutinePose[];
}

/**
 * Converts a Routine to YogaFlow format for UI components
 */
const routineToYogaFlow = (routine: Routine): YogaFlow => {
  return {
    id: routine.id!.toString(), // Convert to string to match YogaFlow type
    name: routine.name,
    description: routine.description,
    createdAt: new Date(routine.created_at || new Date().toISOString()), // Convert to Date object
    poses: routine.poses?.map(pose => pose.name_english || pose.name_german || 'Unnamed Pose')
  };
};

/**
 * Gets all yoga flows for the current user
 * @returns {Promise<YogaFlow[]>} Array of yoga flows
 */
export const getAllYogaFlows = async (userEmail: string): Promise<YogaFlow[]> => {
  try {
    // If no userEmail is provided, we'll get all routines
    // In a real app, you might want to restrict this
    const { data, error } = await supabase
      .from('routines')
      .select('*')
      .eq('user_email', userEmail)
      .order('created_at', { ascending: false });

    if (error) {
      throw error;
    }

    // Convert routines to YogaFlow format
    return (data || []).map(routineToYogaFlow);
  } catch (error) {
    console.error('Error loading yoga flows:', error);
    return [];
  }
};

/**
 * Gets a specific yoga flow by ID
 * @param {string} id - ID of the yoga flow
 * @returns {Promise<YogaFlow | null>} Yoga flow or null if not found
 */
export const getYogaFlowById = async (id: string): Promise<YogaFlow | null> => {
  try {
    const routineId = parseInt(id);
    if (isNaN(routineId)) {
      return null;
    }

    // Get the routine
    const routine = await getRoutine(routineId);
    if (!routine) {
      return null;
    }

    // Convert to YogaFlow format
    return routineToYogaFlow(routine);
  } catch (error) {
    console.error('Error loading yoga flow:', error);
    return null;
  }
};

/**
 * Loads all routines for a specific user
 * @param {string} userEmail - Email address of the user
 * @returns {Promise<Routine[]>} Array of routines
 */
export const getUserRoutines = async (userEmail: string): Promise<Routine[]> => {
  try {
    const { data, error } = await supabase
      .from('routines')
      .select('*')
      .eq('user_email', userEmail);

    if (error) {
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error('Error loading routines:', error);
    throw error;
  }
};

/**
 * Loads a specific routine by its ID
 * @param {string} routineId - ID of the routine
 * @returns {Promise<Routine>} Routine object with poses
 */
export const getRoutine = async (routineId: number): Promise<Routine> => {
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
      .select(`
        *,
        poses (
          name_english,
          name_german,
          name_sanskrit
        )
      `)
      .eq('routine_id', routineId)
      .order('position');

    if (posesError) {
      throw posesError;
    }

    // Map the poses data to include the pose information directly
    const posesWithInfo = posesData.map(pose => ({
      ...pose,
      name_english: pose.poses?.name_english,
      name_german: pose.poses?.name_german,
      name_sanskrit: pose.poses?.name_sanskrit
    }));

    return {
      ...routineData,
      poses: posesWithInfo
    };
  } catch (error) {
    console.error('Error loading routine:', error);
    throw error;
  }
};

/**
 * Saves or updates a routine
 * @param {Routine} data - Routine object to save
 * @returns {Promise<number>} ID of the saved routine
 */
export const saveRoutine = async (data: Routine): Promise<number> => {
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
      
      // Insert new poses
      if (poses && poses.length > 0) {
        const posesWithRoutineId = poses.map((pose, index) => ({
          pose_id: pose.pose_id,
          breath: pose.breath,
          equipment: pose.equipment,
          type: pose.type,
          text: pose.text,
          routine_id: routineData.id,
          position: index
        }));

        const { error: posesError } = await supabase
          .from('routine_poses')
          .insert(posesWithRoutineId);

        if (posesError) {
          throw posesError;
        }
      }

      return routineData.id;

    } else {
      // Insert new routine
      const { data: routineData, error: routineError } = await supabase
        .from('routines')
        .insert(routine)
        .select()
        .single();

      if (routineError) {
        throw routineError;
      }

      // Insert poses
      if (poses && poses.length > 0) {
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
      }

      return routineData.id;
    }
  } catch (error) {
    console.error('Error saving routine:', error);
    throw error;
  }
};

/**
 * Loads all poses from the database
 * @returns {Promise<Pose[]>} Array of poses
 */
export const getAllPoses = async (): Promise<Pose[]> => {
  try {
    const { data, error } = await supabase
      .from('poses')
      .select('*')
      .order('id');

    if (error) {
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error('Error loading poses:', error);
    throw error;
  }
}; 