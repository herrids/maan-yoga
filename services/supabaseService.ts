import { supabase } from '../config/supabaseConfig';

/**
 * Lädt alle Flown für einen bestimmten Benutzer
 * @param {string} userEmail - E-Mail-Adresse des Benutzers
 * @returns {Promise<Array>} Array von Flown
 */
export const getUserFlows = async (userEmail: string) => {
  try {
    const { data, error } = await supabase
      .from('flows')
      .select('*')
      .eq('user_email', userEmail);

    if (error) {
      throw error;
    }

    return data;
  } catch (error: unknown) {
    console.error('Fehler beim Laden der Flown:', error instanceof Error ? error.message : String(error));
    throw error;
  }
};

/**
 * Lädt eine spezifische Flow anhand ihrer ID
 * @param {string} flowId - ID der Flow
 * @returns {Promise<Object>} Flow-Objekt
 */ 
export const getFlow = async (flowId: string) => {
  try {
    const { data: flowData, error: flowError } = await supabase
      .from('flows')
      .select('*')
      .eq('id', flowId)
      .single();

    if (flowError) {
      throw flowError;
    }

    const { data: posesData, error: posesError } = await supabase
      .from('flow_poses')
      .select(`
        *,
        poses (
          name_english,
          name_german,
          name_sanskrit
        )
      `)
      .eq('flow_id', flowId)
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
      ...flowData,
      poses: posesWithInfo
    };
  } catch (error: unknown) {
    console.error('Fehler beim Laden der Flow:', error instanceof Error ? error.message : String(error));
    throw error;
  }
};

/**
 * Saves or updates a flow
 * @param {Object} flow - Flow object to save
 * @returns {Promise<Object>} Saved flow
 */
export const saveFlow = async (data: any) => {
  try {
    const { poses, ...flow } = data;

    
    if (flow.id) {
      // Update flow
      const { data: flowData, error: flowError } = await supabase
        .from('flows')
        .update(flow)
        .eq('id', flow.id)
        .select()
        .single();

      if (flowError) {
        throw flowError;
      }

      // Delete existing poses
      const { error: deleteError } = await supabase
        .from('flow_poses')
        .delete()
        .eq('flow_id', flow.id);

      if (deleteError) {
        throw deleteError;
      }
      // Insert new poses
      const posesWithFlowId = poses.map((pose: any, index: number) => ({
        pose_id: pose.pose_id,
        breath: pose.breath,
        equipment: pose.equipment,
        type: pose.type,
        text: pose.text,
        flow_id: flowData.id,
        position: index
      }));

      const { error: posesError } = await supabase
        .from('flow_poses')
        .insert(posesWithFlowId);

      if (posesError) {
        throw posesError;
      }

      return flowData.id;

    } else {
      // Insert new flow
      const { data: flowData, error: flowError } = await supabase
        .from('flows')
        .insert(flow)
        .select()
        .single();

      if (flowError) {
        throw flowError;
      }

      // Insert poses
      const posesWithFlowId = poses.map((pose: any, index: number) => ({
        ...pose,
        flow_id: flowData.id,
        position: index
      }));

      const { error: posesError } = await supabase
        .from('flow_poses')
        .insert(posesWithFlowId);

      if (posesError) {
        throw posesError;
      }

      return flowData.id;
    }
  } catch (error: unknown) {
    console.error('Fehler beim Speichern der Flow:', error instanceof Error ? error.message : String(error));
    throw error;
  }
};

/**
 * Lädt alle Posen aus der Datenbank
 * @returns {Promise<Array>} Array von Posen
 */
export const getAllPoses = async () => {
  try {
    const { data, error } = await supabase
      .from('poses')
      .select('*')
      .order('id');

    if (error) {
      throw error;
    }

    return data;
  } catch (error: unknown) {
    console.error('Fehler beim Laden der Posen:', error instanceof Error ? error.message : String(error));
    throw error;
  }
}; 